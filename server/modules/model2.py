import torch
from torch import nn
from torch.nn import functional as F
import torchvision
import torchvision.transforms as transforms
import cv2
import numpy as np

# PixelNormalization Module
class PixelNorm(nn.Module): # 修正点1
    def forward(self, x):
        eps = 1e-8
        return x / ((torch.mean(x**2, dim=1, keepdim=True) + eps) ** 0.5)


# equalized larning rate
class WeightScale(nn.Module): # 修正点2
    def forward(self, x, gain=2):
        c = ( (x.shape[1] * x.shape[2] * x.shape[3]) / 2) **0.5
        return x / c


# バッチの多様性を考慮
class MiniBatchStd(nn.Module):
    def forward(self, x):
        std = torch.std(x, dim=0, keepdim=True)
        mean = torch.mean(std, dim=(1,2,3), keepdim=True)
        n,c,h,w = x.shape
        mean = torch.ones(n,1,h,w, dtype=x.dtype, device=x.device)*mean
        return torch.cat((x,mean), dim=1)


# 畳み込み処理回りが煩雑だからモジュール化
class Conv2d(nn.Module):
    def __init__(self, inch, outch, kernel_size, padding=0):
        super().__init__()
        self.layers = nn.Sequential(
            WeightScale(),
            nn.ReflectionPad2d(padding),
            nn.Conv2d(inch, outch, kernel_size, padding=0),
            PixelNorm(),
            )
        nn.init.kaiming_normal_(self.layers[2].weight) #Heの初期化

    def forward(self, x):
        return self.layers(x)

class ResBlock(nn.Module):
    def __init__(self, inch, outch, kernel_size, padding=0):
        super().__init__()

        self.conv1 = Conv2d(inch, outch, 3, padding=1)
        self.relu1 = nn.LeakyReLU(0.2, inplace=False)
        self.conv2 = Conv2d(outch, outch, 3, padding=1)
        self.relu2 = nn.LeakyReLU(0.2, inplace=False)

        self.relu3 = nn.LeakyReLU(0.2, inplace=False)

        self.shortcut = nn.Conv2d(inch, outch, kernel_size=(1, 1), padding=0)

    def forward(self, x):

        h = self.conv1(x)
        h = self.relu1(h)
        h = self.conv2(h)
        h = self.relu2(h)

        x = self.shortcut(x)
        y = self.relu3(h + x)
        return y


# Generatorの連結モデルを定義
class ConvModuleG(nn.Module):
    '''
    Args:
        out_size: (int), Ex.: 16 (resolution)
        inch: (int),  Ex.: 256
        outch: (int), Ex.: 128
    '''
    def __init__(self, out_size, inch, outch, first=False):
        super().__init__()

        if first:
            layers = [
                Conv2d(inch, outch, 3, padding=1),
                nn.LeakyReLU(0.2, inplace=False),
                Conv2d(outch, outch, 3, padding=1),
                nn.LeakyReLU(0.2, inplace=False),
            ]

        else:
            layers = [
                nn.Upsample((out_size, out_size), mode='nearest'),
                ResBlock(inch, outch,3,padding=1),
                ResBlock(outch, outch,3,padding=1),
                Conv2d(outch, outch, 3, padding=1),
                nn.LeakyReLU(0.2, inplace=False),
            ]

        self.layers = nn.Sequential(*layers)

    def forward(self, x):
        return self.layers(x)


class ConvModuleD(nn.Module):
    '''
    Args:
        out_size: (int), Ex.: 16 (resolution)
        inch: (int),  Ex.: 256
        outch: (int), Ex.: 128
    '''
    def __init__(self, out_size, inch, outch, final=False):
        super().__init__()

        if final:
            layers = [
                MiniBatchStd(), # final block only
                Conv2d(inch+1, outch, 3, padding=1),
                nn.LeakyReLU(0.2, inplace=False),
                Conv2d(outch, outch, 4, padding=0),
                nn.LeakyReLU(0.2, inplace=False),
                nn.Conv2d(outch, 1, 1, padding=0),
            ]
        else:
            layers = [
                Conv2d(inch, outch, 3, padding=1),
                nn.LeakyReLU(0.2, inplace=False),
                Conv2d(outch, outch, 3, padding=1),
                nn.LeakyReLU(0.2, inplace=False),
                nn.AdaptiveAvgPool2d((out_size, out_size)),
            ]

        self.layers = nn.Sequential(*layers)

    def forward(self, x):
        return self.layers(x)



class Generator(nn.Module):
    def __init__(self):
        super().__init__()

        # conv modules & toRGBs
        scale = 1
        inchs  = np.array([512/16,512,256,128,64,32,16], dtype=np.uint32)*scale # inputするレイヤー数(追加分)
        outchs = np.array([512,256, 128,64,32,16,8], dtype=np.uint32)*scale # outputするレイヤー数(追加分)
        sizes = np.array([4,8,16,32,64,128,256], dtype=np.uint32)
        firsts = np.array([True, False, False, False, False, False,False], dtype=np.bool)
        blocks, toRGBs = [], []
        for s, inch, outch, first in zip(sizes, inchs, outchs, firsts):
            blocks.append(ConvModuleG(s, inch, outch, first))
            toRGBs.append(nn.Conv2d(outch, 3, 1, padding=0))

        self.blocks = nn.ModuleList(blocks)
        self.toRGBs = nn.ModuleList(toRGBs)

    def forward(self, x, res, eps=1e-7):
        # to image
        n,c = x.shape
        x = x.reshape(n,c//16,4,4)

        # for the highest resolution
        res = min(res, len(self.blocks))

        # get integer by floor
        nlayer = max(int(res-eps), 0)
        #print(res,nlayer)
        for i in range(nlayer):
            x = self.blocks[i](x)

        # high resolution
        x_big = self.blocks[nlayer](x)
        dst_big = self.toRGBs[nlayer](x_big)

        if nlayer==0:
            x = dst_big
        else: # レイヤー変更時の負荷軽減
            # low resolution
            x_sml = F.interpolate(x, x_big.shape[2:4], mode='nearest')
            dst_sml = self.toRGBs[nlayer-1](x_sml)
            alpha = res - int(res-eps)
            #print(alpha)
            x = (1-alpha)*dst_sml + alpha*dst_big

        #return x, n, res
        return torch.sigmoid(x)



class Discriminator(nn.Module):
    def __init__(self):
        super().__init__()

        self.minbatch_std = MiniBatchStd()

        # conv modules & toRGBs
        scale = 1
        inchs = np.array([512,256,128,64,32,16,8], dtype=np.uint32)*scale
        outchs  = np.array([512,512, 256,128,64, 32,16], dtype=np.uint32)*scale
        sizes = np.array([1,4,8,16,32,64,128], dtype=np.uint32)
        finals = np.array([True, False, False, False, False, False,False], dtype=np.bool)
        blocks, fromRGBs = [], []
        for s, inch, outch, final in zip(sizes, inchs, outchs, finals):
            fromRGBs.append(nn.Conv2d(3, inch, 1, padding=0))
            blocks.append(ConvModuleD(s, inch, outch, final=final))

        self.fromRGBs = nn.ModuleList(fromRGBs)
        self.blocks = nn.ModuleList(blocks)

    def forward(self, x, res):
        # for the highest resolution
        res = min(res, len(self.blocks))

        # get integer by floor
        eps = 1e-8
        n = max(int(res-eps), 0)

        # high resolution
        x_big = self.fromRGBs[n](x)
        x_big = self.blocks[n](x_big)

        if n==0:
            x = x_big
        else:
            # low resolution
            x_sml = F.adaptive_avg_pool2d(x, x_big.shape[2:4])
            x_sml = self.fromRGBs[n-1](x_sml)
            alpha = res - int(res-eps)
            x = (1-alpha)*x_sml + alpha*x_big

        for i in range(n):
            x = self.blocks[n-1-i](x)

        return x



def gradient_penalty(netD, real, fake, res, batch_size, gamma=1):
    device = real.device
    alpha = torch.rand(batch_size, 1, 1, 1, requires_grad=True).to(device)
    x = alpha*real + (1-alpha)*fake
    d_ = netD.forward(x, res)
    g = torch.autograd.grad(outputs=d_, inputs=x,
                            grad_outputs=torch.ones(d_.shape).to(device),
                            create_graph=True, retain_graph=True,only_inputs=True)[0]
    g = g.reshape(batch_size, -1)
    return ((g.norm(2,dim=1)/gamma-1.0)**2).mean()
