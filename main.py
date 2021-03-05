# -*- coding: utf-8 -*-
from server.modules import model,generate_images
from server.modules.seeds import seeds

import torch
import cv2
import numpy as np
import os.path
import datetime
import random
from moviepy.editor import ImageSequenceClip

from flask import Flask, render_template, request, redirect, url_for, send_file, send_from_directory, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__ , template_folder="dist",static_folder="dist")
UPLOAD_FOLDER = './tmp/'
filepath = os.path.dirname(os.path.abspath(__file__))

# CORSの許可
CORS(app)

# tmpフォルダーを実質静的フォルダーに
@app.route('/tmp/<path:path>')
def send_tmp(path):
    return send_from_directory('tmp', path)

# publicフォルダーを実質静的フォルダーに
@app.route('/public/<path:path>')
def send_public(path):
    return send_from_directory('public', path)

# tmp/fontsフォルダーを実質静的フォルダーに
@app.route('/fonts/<path:path>')
def send_fonts(path):
    return send_from_directory('dist/fonts', path)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/styles.css')
def send_css():
    file = './dist/styles.css'
    return send_file(file, mimetype='text/css')

@app.route('/bundle.js')
def send_javascript():
    file = './dist/bundle.js'
    return send_file(file, mimetype='text/javascript')

#10枚ランダムリクエスト
@app.route('/get10image', methods = ['POST'])
def r10ImgsAndWeights():
    #10枚の画像と、重みを返す。重みは{{seed1:weight1, seed2:weight2},...}
    imgs,weights = generate_images.generate10Image(netG,device,seeds)
    json = {}

    for i in range(0,len(imgs)):
        tempimg_filename = randomName()
        cv2.imwrite(f'{UPLOAD_FOLDER}images/{tempimg_filename}.jpg', imgs[i])
        json[f'img{i}'] = {"path" : tempimg_filename,
                           "seed1" : weights[i][0],
                           "seed2" : weights[i][2],
                           "weight1" : weights[i][1],
                           "weight2" : weights[i][3]
                           }

    return make_response(jsonify(json))

#
@app.route('/getmovie',methods=['POST'])
def rMp4():
    if request.method != 'POST':
        return 0
    weightjson = request.json
    clip = generate_images.generateLatentMovie(weightjson,netG,device)

    tempimg_filename = randomName()
    file_name = f'{UPLOAD_FOLDER}videos/{tempimg_filename}.mp4'
    clip.write_videofile(file_name)

    return file_name

@app.route('/getframe',methods=['POST'])
def rVideoToFrame():
    if request.method != 'POST':
        return 0
    img_info = request.json
    img = generate_images.getFrame(img_info["path"],img_info["frame"]) #指定された番号のimgを返す

    tempimg_filename = randomName()
    file_name = f'{UPLOAD_FOLDER}images/{tempimg_filename}.jpg'
    cv2.imwrite(file_name, img)

    return file_name

def randomName():
    r = random.randint(0,999999999999)
    now = datetime.datetime.now().strftime('%Y-%m-%d')
    tempimg_filename = f'img{now}-{r}'
    return tempimg_filename


if __name__ == "__main__":
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    filepath = os.path.dirname(__file__)
    netG = model.Generator().to(device)
    netG.load_state_dict(torch.load(f'{filepath}/server/model/modelparam_5.pth' , map_location=torch.device(device)))
    print(device)

    app.run()
