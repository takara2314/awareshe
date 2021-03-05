import React, { useEffect } from 'react';
import ServiceProps from '../models/ServiceProps';

const WaitVideo = (props: ServiceProps) => {
  useEffect(() => {
    console.log(props.selects);
  }, []);

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
        <h1 className="text-6xl font-bold text-red-900">
          4
        </h1>
      </section>

      <section className="text-center mx-auto">
        <h1 className="font-bold text-3xl">
          彼女を生み出しています…
        </h1>
        少し待ってね！さっき選んでもらった画像を参考に、彼女を生み出しているよ！
      </section>

      <section className="w-11/12 h-128 bg-white mx-auto mt-6 rounded-xl grid grid-cols-2 justify-items-center items-center">
        <div className="w-full h-full relative">
          <div className="animate-pulse bg-pink-500 w-80 h-80 m-auto rounded-3xl absolute inset-0" />
          <div className="w-64 h-64 m-auto absolute inset-0">
            <img
              src={props.sample10Imgs[props.selects[0]][1]}
              alt={props.sample10Imgs[props.selects[0]][0]}
              className="w-64 select-none"
            />
          </div>
        </div>

        <div className="w-full h-full relative">
          <div className="animate-pulse bg-pink-500 w-80 h-80 m-auto rounded-3xl absolute inset-0" />
          <div className="w-64 h-64 m-auto absolute inset-0">
            <img
              src={props.sample10Imgs[props.selects[1]][1]}
              alt={props.sample10Imgs[props.selects[1]][0]}
              className="w-64 select-none"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <button
          className="text-white font-bold mx-auto focus:outline-none"
          onClick={() => {
            props.changeProcess('select10');
          }}
        >
          参考にする画像を選び直す
        </button>
      </section>
    </>
  )
}

export default WaitVideo;