import React, { useEffect, useRef } from 'react';
import ServiceProps from '../models/ServiceProps';

const Select30 = (props: ServiceProps) => {
  const videoObj: React.RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const seekbarObj: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  useEffect(() => {
    seekbarObj.current!.value = '15';
  }, [])

  const videoPosChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    videoObj.current!.currentTime = Number(e.target.value) / 30;
  }

  return (
    <>
      <section className="flex flex-row justify-between w-72 mx-auto my-8 select-none">
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

      <section className="w-11/12 h-128 bg-white mx-auto mt-6 p-6 rounded-x flex flex-col justify-center items-center">
        <div className="mb-8">
          <video
            src="../public/sample.mp4"
            ref={videoObj}
            className="w-96"
          />
        </div>
        <div>
          <input
            type="range"
            min={1}
            max={30}
            onChange={videoPosChange}
            className="w-144"
            ref={seekbarObj}
          />
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