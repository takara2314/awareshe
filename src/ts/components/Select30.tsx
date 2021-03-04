import React, { useEffect, useRef } from 'react';
import ServiceProps from '../models/ServiceProps';

const Select30 = (props: ServiceProps) => {
  const videoObj: React.RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const selectFrameObj: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const seekbarObj: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  useEffect(() => {
    selectFrameObj.current!.value = '15';
    seekbarObj.current!.value = '15';
    changeVideoFrame(15);
  }, []);

  const textFrameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    seekbarObj.current!.value = e.target.value;
    changeVideoFrame(Number(e.target.value));
  }

  const seekFrameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    selectFrameObj.current!.value = e.target.value;
    changeVideoFrame(Number(e.target.value));
  }

  const changeVideoFrame = (frame: number): void => {
    if (frame > 30) {
      videoObj.current!.currentTime = 30 / 30;
    } else if (frame < 1) {
      videoObj.current!.currentTime = 1 / 30;
    } else if (Number.isNaN(frame)) {
      videoObj.current!.currentTime = 15 / 30;
    } else {
      videoObj.current!.currentTime = frame / 30;
    }
  }

  const selectFrameCheck = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (Number(e.target.value) > 30) {
      selectFrameObj.current!.value = '30';
      seekbarObj.current!.value = '30';

    } else if (Number(e.target.value) < 1) {
      selectFrameObj.current!.value = '1';
      seekbarObj.current!.value = '1';

    } else if (Number.isNaN(Number(e.target.value))) {
      selectFrameObj.current!.value = '15';
      seekbarObj.current!.value = '15';
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
        1枚1枚微妙な違いがあるよ！シークバーを動かして見てみよう！
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