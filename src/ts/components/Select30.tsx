import React, { useEffect, useRef } from 'react';
import ServiceProps from '../models/ServiceProps';
import getFrame from '../services/getFrame';
import GetFramePost from '../models/GetFramePost';

const Select30 = (props: ServiceProps) => {
  const videoObj: React.RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const selectFrameObj: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const seekbarObj: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  // フレームの初期値は15
  useEffect(() => {
    selectFrameObj.current!.value = props.videoFrame.toString();
    seekbarObj.current!.value = props.videoFrame.toString();
    changeVideoFrame(props.videoFrame);
  }, []);

  // テキストでフレームを変更するときの時の処理
  const textFrameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    seekbarObj.current!.value = e.target.value;
    changeVideoFrame(Number(e.target.value));
  }

  // テキストボックスからフォーカスが離れたとき、不適切なものが入ってたら初期値にする
  const selectFrameCheck = (e: React.FocusEvent<HTMLInputElement>): void => {
    // フレーム最大値より大きい値が指定されたら
    if (Number(e.target.value) > 30) {
      selectFrameObj.current!.value = '30';
      seekbarObj.current!.value = '30';

    // フレーム最小値より小さい値が指定されたら
    } else if (Number(e.target.value) < 1) {
      selectFrameObj.current!.value = '1';
      seekbarObj.current!.value = '1';

    // 数値以外が混じってたら
    } else if (Number.isNaN(Number(e.target.value))) {
      selectFrameObj.current!.value = props.videoFrame.toString();
      seekbarObj.current!.value = props.videoFrame.toString();
    }
  }

  // シークバーでフレームを変更するときの処理
  const seekFrameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    selectFrameObj.current!.value = e.target.value;
    changeVideoFrame(Number(e.target.value));
  }

  // 特定のフレームの位置に動画の再生位置を置く
  const changeVideoFrame = (frame: number): void => {
    // フレーム最大値より大きい値が指定されたら
    if (frame > 30) {
      props.setVideoFrame(30);
      videoObj.current!.currentTime = 30 / 30;

    // フレーム最小値より小さい値が指定されたら
    } else if (frame < 1) {
      props.setVideoFrame(1);
      videoObj.current!.currentTime = 1 / 30;

    // 数値以外が混じっていたら
    } else if (Number.isNaN(frame)) {
      props.setVideoFrame(props.videoFrame);
      videoObj.current!.currentTime = 15 / 30;

    // 値に問題がなかったら
    } else {
      props.setVideoFrame(frame);
      videoObj.current!.currentTime = frame / 30;
    }
  }

  // フレームをサーバーから取得し、完成画面を表示
  const select30Handler = (): void => {
    let postData: GetFramePost = {
      img1: {
        path:    props.sample10Imgs[props.selects[0]][1],
        seed1:   props.sample10Seeds[props.selects[0]][0],
        seed2:   props.sample10Seeds[props.selects[0]][1],
        weight1: props.sample10Weights[props.selects[0]][0],
        weight2: props.sample10Weights[props.selects[0]][1]
      },
      img2: {
        path:    props.sample10Imgs[props.selects[1]][1],
        seed1:   props.sample10Seeds[props.selects[1]][0],
        seed2:   props.sample10Seeds[props.selects[1]][1],
        weight1: props.sample10Weights[props.selects[1]][0],
        weight2: props.sample10Weights[props.selects[1]][1]
      },
      frame: props.videoFrame - 1
    };

    console.log(postData);

    getFrame(postData)
    .then(res => res.text())
    .then(
      (result: string) => {
        // デバッグ
        console.log(result);

        props.setFramePath(result);
        props.changeProcessForward(true);
        props.changeProcess('result');
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  return (
    <>
      <section className="text-center mx-auto mt-24">
        <h1 className="font-bold text-3xl">
          変化工程から好きな1枚を選ぼう！
        </h1>
        選んだ2枚から彼女を生み出したよ！シークバーを動かして、彼女が変化するところを見よう！
      </section>

      <section className="w-11/12 h-128 bg-white mx-auto mt-6 p-6 rounded-xl flex flex-col justify-center items-center">
        <div className="mb-8">
          <video
            src={`http://localhost:5000/${props.videoPath.slice(2)}`}
            ref={videoObj}
            className="w-96"
          />
        </div>
        <div className="w-144 h-8 flex flex-row justify-center">
          <div className="text-black mr-4">
            <input
              type="text"
              placeholder="数"
              onChange={textFrameChange}
              onBlur={selectFrameCheck}
              className="bg-gray-200 w-12 h-8 text-center rounded-xl focus:outline-none"
              ref={selectFrameObj}
            />
            <span className="select-none ml-2">
              / 30
            </span>
          </div>
          <div>
            <input
              type="range"
              min={1}
              max={30}
              onChange={seekFrameChange}
              className="w-96 h-8"
              ref={seekbarObj}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-row justify-between w-128 h-10 mt-5 mx-auto">
        <button
          className="text-white hover:text-gray-100 font-bold mx-auto rounded-xl focus:outline-none transition-all"
          onClick={() => {
            props.changeProcessForward(false);
            props.changeProcess('select10');
          }}
        >
          参考にする画像を変える
        </button>

        <button
          className="w-60 h-10 bg-red-800 hover:bg-red-900 text-white font-bold rounded-xl focus:outline-none transition-all"
          onClick={() => {select30Handler()}}
        >
          これに決める
        </button>
      </section>
    </>
  );
}

export default Select30;
