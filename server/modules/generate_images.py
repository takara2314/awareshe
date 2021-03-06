# -*- coding: utf-8 -*-
import random
import numpy as np
import cv2
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from moviepy.editor import ImageSequenceClip
import torch
from torch.nn import functional as F
import os.path


num = 30 #動画の画像枚数
filepath = os.path.dirname(os.path.abspath(__file__))
# 10このランダムな画像と、画像のseed値情報を返します
def generate10Image(model,device,seeds):
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
        z1 = np.clip(z1,-1.,1.)
        np.random.seed(seed=double_seed[1])
        z2 = np.random.randn(1,512*16)
        z2 = np.clip(z2,-1.,1.)

        r = random.random()
        #潜在変数を混ぜる
        z = z1*r + z2*(1.0-r)
        dims.append(z)
        weights[i] = [double_seed[0] , r,
                      double_seed[1] , (1.0-r)]

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
#weightsに従って、潜在変数を動かした動画を作成します。返り値は動画
def generateLatentMovie(weight,model,device):
    #全画像をimgnumを参考に生成
    images = []
    temp_images = makeimgs(weight,model,device)
    for image in temp_images:
        images.append(np.array(image))

    #imagesを基にgifを作成

    clip=ImageSequenceClip(images,fps=30)
    return clip


def makeimgs(weight,model,device):
    dims = []
    for key in weight:
        np.random.seed(seed=weight[key]["seed1"])
        z1 = np.random.randn(1,512*16)
        z1 = np.clip(z1,-1.,1.)
        np.random.seed(seed=weight[key]["seed2"])
        z2 = np.random.randn(1,512*16)
        z2 = np.clip(z2,-1.,1.)

        z = (z1 * weight[key]["weight1"]) + (z2 * weight[key]["weight2"])
        dims.append(z)
    startdim = dims[0]
    enddim = dims[1]
    alphaValues = np.linspace(0, 1, num)

  #値をすこしずつshift
    vectors = []
    for alpha in alphaValues:
        dim = startdim*(1-alpha) + enddim * alpha
        dim = dim.tolist()
        vectors.append(dim)
    vectors = np.array(vectors)
    vectors = vectors.transpose(1,0,2).reshape(num,8192)

    vectors = torch.from_numpy(vectors.astype(np.float32)).to(device)
    dst = model.forward(vectors, 6)
    dst = F.interpolate(dst, (256, 256), mode='nearest')
    dst = dst.to('cpu').detach().numpy()
    n, c, h, w = dst.shape
    dst = dst.transpose(0,2,3,1)

    dst = np.clip(dst*255., 0, 255).astype(np.uint8)

    #shift画像が256x256xRGBで返ります
    return dst


def getFrame(weight,model,device):
    print(weight)
    dims = []
    for key in weight:
        if key!="frame":
            np.random.seed(seed=weight[key]["seed1"])
            z1 = np.random.randn(1,512*16)
            z1 = np.clip(z1,-1.,1.)
            np.random.seed(seed=weight[key]["seed2"])
            z2 = np.random.randn(1,512*16)
            z2 = np.clip(z2,-1.,1.)

            z = (z1 * weight[key]["weight1"]) + (z2 * weight[key]["weight2"])
            dims.append(z)
    startdim = dims[0]
    enddim = dims[1]
    alphaValues = np.linspace(0, 1, num)

  #値をすこしずつshift
    alpha = alphaValues[weight["frame"]]
    dim = startdim*(1-alpha) + enddim * alpha
    dim = dim.tolist()
    vectors = np.array(dim)

    vectors = torch.from_numpy(vectors.astype(np.float32)).to(device)
    dst = model.forward(vectors, 6)
    dst = F.interpolate(dst, (256, 256), mode='nearest')
    dst = dst.to('cpu').detach().numpy()
    n, c, h, w = dst.shape
    dst = dst.reshape(c,h,w)
    dst = dst.transpose(1,2,0)

    dst = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
    dst = np.clip(dst*255., 0, 255).astype(np.uint8)
    return dst
