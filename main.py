# -*- coding: utf-8 -*-
from server.modules import model,generate_images
import torch
import cv2
import numpy as np
import os.path
import datetime
import random
from moviepy.editor import ImageSequenceClip

from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify

app = Flask(__name__ , template_folder="dist")
UPLOAD_FOLDER = './tmp/'
filepath = os.path.dirname(__file__)
now = datetime.datetime.now().strftime('%Y-%m-%d')

@app.route('/')
def index():
    return render_template("index.html")

#10枚ランダムリクエスト
@app.route('/get10image', methods = ['POST'])
def r10ImgsAndWeights():
    #10枚の画像と、重みを返す。重みは{{seed1:weight1, seed2:weight2},...}
    imgs,weights = generate_images.generate10Image(netG,device)
    json = {}

    for i in range(0,len(imgs)):
        r = random.randint(0,999999999999999999999)
        tempimg_filename = f'img{now}-{r}'
        cv2.imwrite(f'{UPLOAD_FOLDER}images/{tempimg_filename}.jpg', imgs[i])
        json[f'{tempimg_filename}'] = weights[i]
    print(json)
    return jsonify(json)

@app.route('/getmovie',methods=['POST'])
def rMp4():
    if request.method != 'POST':
        return 0
    weightjson = request.json
    clip = generate_images.generateLatentMovie(weightjson,netG,device)
    r = random.randint(0,999999999999)
    tempimg_filename = f'img{now}-{r}'
    clip.write_videofile(f'{UPLOAD_FOLDER}videos/{tempimg_filename}.mp4')
    return render_template("index.html", latentvideo = f'{tempimg_filename}.mp4')

@app.route('/getframe',methods=['POST'])
def rVideoToFrame():
    if request.method != 'POST':
        return 0
    img_info = request.json
    r = random.randint(0,999999999999)
    tempimg_filename = f'img{now}-{r}'
    img = generate_images.getFrame(img_info["path"],img_info["number"]) #指定された番号のimgを返す
    cv2.imwrite(f'{UPLOAD_FOLDER}images/{tempimg_filename}.jpg', img)
    return render_template("index.html",design_image = f'{tempimg_filename}.jpg')


if __name__ == "__main__":
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    filepath = os.path.dirname(__file__)
    netG = model.Generator().to(device)
    netG.load_state_dict(torch.load(f'{filepath}/server/model/modelparam_5.pth' , map_location=torch.device(device)))
    """
    weight = {
    "p" : {
           19775 : 1,
           19698 : 0
          },
    "s" :    {
           19704 :  1,
           19368 : 0
          }
    }

    generate_images.generateLatentMovie(weight,netG,device)
    """
    getF = generate_images.getFrame("C:/Users/kosakae256/Documents/Kosakae-Deployment/awareshe/tmp/videos/aaa.mp4",0)
    cv2.imwrite("C:/Users/kosakae256/Documents/Kosakae-Deployment/awareshe/tmp/images/test.jpg", getF)
    app.run()
