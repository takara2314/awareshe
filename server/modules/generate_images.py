import random
import numpy as np
import cv2
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from moviepy.editor import ImageSequenceClip
import torch
from torch.nn import functional as F


seeds = [19775,19698,19704,19368,19328,19317,19083,19001,18897,
    18816,18839,18711,18615,18629,18525,18499,18452,18227,18196,
    17997,17672,17548,17358,17278,16548,16409,16327,16106,15472,
    15150,14918,8923,7696,7313,6761,6669,6061,5775,5749,
    5483,5061,4900,4907,4862,4889,4354,4100,3994,3904,
    3512,3407,2726,2634,2182,
    2031,1871,1885,1886,1564,
    1279,1284,1210,1151,1068,757,
    724,699,504
    ]
# 10このランダムな画像と、画像のseed値情報を返します
def generate10Image(model,device):
    #dimを10個作る
    #seed値情報を記録する
    weights = {}
    dims = []
    imgs = []
    for i in range(0,10):
        #2つのseedを指定
        double_seed = random.sample(seeds, 2)
        np.random.seed(seed=double_seed[0])
        z1 = np.random.randn(1,512*16)
        np.random.seed(seed=double_seed[1])
        z2 = np.random.randn(1,512*16)

        r = random.random()
        #潜在変数を混ぜる
        z = z1*r + z2*(1.0-r)
        dims.append(np.clip(z,-1.,1.))
        weights[i] = {double_seed[0] : r,
                      double_seed[1] : (1.0-r)}

    for z in dims:
        z = torch.from_numpy(z.astype(np.float32)).to(device)
        dst = model.forward(z, 6)
        dst = F.interpolate(dst, (256, 256), mode='nearest')
        dst = dst.to('cpu').detach().numpy()
        n, c, h, w = dst.shape
        dst = dst.reshape(c,h,w)
        dst = dst.transpose(1,2,0)

        dst = np.clip(dst*255., 0, 255).astype(np.uint8)
        dst = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
        imgs.append(dst)

    return imgs,weights
#weightsに従って、潜在変数を動かした動画を作成します。返り値は動画のpath
def generateLatentMovie(weight,model,device):
    #全画像をimgnumを参考に生成
  images = []
  for i in range(0,len(shift)-1):
    images_temp = makeimgs(shift[i],shift[i+1],inum)
    for im in images_temp[:-1]:
      images.append(im)

  #imagesを基にgifを作成
  clip = ImageSequenceClip(images, fps = fps)
  clip.write_videofile(f'/content/drive/MyDrive/GANstudy/PGGAN/animations/{filename}')


def makeimgs(weight,model,device):
    for key in weight:
        weight[key].keys()[0]
        np.random.seed(seed=s)
        z = np.random.randn(1,512*16)
        np.random.seed(seed=e)
        z2 = np.random.randn(1,512*16)
        z = np.concatenate([z,z2],axis = 0)
        z = np.clip(z,-1.,1.)

    startdim = z[0]
    enddim = z[1]
    images = []
    alphaValues = np.linspace(0, 1, num)

  #値をすこしずつshift
    for alpha in alphaValues:
        vectors = []
        dim = startdim*(1-alpha) + enddim * alpha
        vectors.append(dim)
        vectors = np.array(vectors)
        vectors = torch.from_numpy(vectors.astype(np.float32)).to(device)
        dst = netG_mavg.forward(vectors, 6)
        dst = F.interpolate(dst, (256, 256), mode='nearest')
        dst = dst.to('cpu').detach().numpy()
        n, c, h, w = dst.shape
        dst = dst.reshape(c,h,w)
        dst = dst.transpose(1,2,0)

        dst = np.clip(dst*255., 0, 255).astype(np.uint8)
        images.append(dst)

    #shift画像が256x256xRGBで返ります
    return images
