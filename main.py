from server.modules import model,generate_images
import torch
import cv2
import numpy as np
import os.path
import datetime
import random

from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify

app = Flask(__name__)
UPLOAD_FOLDER = './tmp/images/'
filepath = os.path.dirname(__file__)

@app.route('/')
def index():
    return render_template("index.html")

#10枚ランダムリクエスト
@app.route('/get10image', methods = ['POST'])
def r10ImgsAndWeights():
    #10枚の画像と、重みを返す。重みは{{seed1:weight1, seed2:weight2},...}
    imgs,weights = generate_images.generate10Image(netG,device)
    now = datetime.datetime.now().strftime('%Y-%m-%d')
    json = {}

    for i in range(0,len(imgs)):
        r = random.randint(0,999999999999999999999)
        tempimg_filename = f'img{now}-{r}'
        cv2.imwrite(f'{UPLOAD_FOLDER}{tempimg_filename}.jpg', imgs[i])
        json[f'{tempimg_filename}'] = weights[i]
    print(json)
    return jsonify(json)

@app.route('/getmovie',methods=['POST'])
def rMp4():
    if request.method != 'POST':
        return 0
    weightjson = request.json
    generate_images.generateLatentMovie(weightjson,netG,device)





if __name__ == "__main__":
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    filepath = os.path.dirname(__file__)
    netG = model.Generator().to(device)
    netG.load_state_dict(torch.load(f'{filepath}/server/model/modelparam_5.pth' , map_location=torch.device(device)))

    app.run()
