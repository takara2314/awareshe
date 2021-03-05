import React, { useEffect, useRef } from 'react';
import ServiceProps from '../models/ServiceProps';

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

  return (
    <>
      <section className="flex flex-row justify-between w-72 mx-auto mt-4 mb-8 select-none">
        <h1 className="text-6xl font-bold text-red-900">
          1
        </h1>
        <h1 className="text-6xl font-bold text-white">
          2
        </h1>
        <h1 className="text-6xl font-bold text-red-900">
          3
        </h1>
      </section>

      <section className="text-center mx-auto">
        <h1 className="font-bold text-3xl">
          変化工程から好きな1枚を選ぼう！
        </h1>
        選んだ2枚から彼女を生み出したよ！シークバーを動かして、彼女が変化するところを見よう！
      </section>

      <section className="w-11/12 h-128 bg-white mx-auto mt-6 p-6 rounded-xl flex flex-col justify-center items-center">
        <div className="mb-8">
          <video
            src="../public/sample.mp4"
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
          className="text-white font-bold mx-auto rounded-xl focus:outline-none"
          onClick={() => {
            props.changeProcess('select10');
          }}
        >
          参考にする画像を変える
        </button>

        <button
          className="w-60 h-10 bg-red-800 text-white font-bold rounded-xl focus:outline-none"
          onClick={() => {
            props.changeProcess('result');
          }}
        >
          これに決める
        </button>
      </section>
    </>
  )
}

export default Select30;