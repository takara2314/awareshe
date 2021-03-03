from server.modules import model,generate_images
import torch
import cv2
import numpy as np
import os.path

from flask import Flask, render_template, request, redirect, url_for, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

#10枚ランダムリクエスト

def rImgsAndWeights():
    #10枚の画像と、重みを返す
    imgs,weights = generate_images.generate10Image(netG,device)
    print("aaaaaa",weights)

if __name__ == "__main__":
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    filepath = os.path.dirname(__file__)
    netG = model.Generator().to(device)
    netG.load_state_dict(torch.load(f'{filepath}/server/model/modelparam_5.pth' , map_location=torch.device(device)))
    rImgsAndWeights()

    app.run()
