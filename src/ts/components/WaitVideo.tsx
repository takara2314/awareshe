import React, { useEffect } from 'react';
import ServiceProps from '../models/ServiceProps';
import getMovie from '../services/getMovie';
import GetMoviePost from '../models/GetMoviePost';

const WaitVideo = (props: ServiceProps) => {
  useEffect(() => {
    loadMovie();
  }, []);

  // 動画をサーバーから取得
  const loadMovie = (): void => {
    let postData: GetMoviePost = {
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
      }
    };

    console.log(postData);

    getMovie(postData)
    .then(res => res.text())
    .then(
      (result: string) => {
        // デバッグ
        console.log(result);

        props.setVideoPath(result);
        props.changeProcess('select30');
      },
      (error: Error) => {
        console.log(error);
      }
    );
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
              src={
                `http://localhost:5000/tmp/images/${props.sample10Imgs[props.selects[0]][1]}.jpg`
              }
              alt={props.sample10Imgs[props.selects[0]][0]}
              className="w-64 select-none"
            />
          </div>
        </div>

        <div className="w-full h-full relative">
          <div className="animate-pulse bg-pink-500 w-80 h-80 m-auto rounded-3xl absolute inset-0" />
          <div className="w-64 h-64 m-auto absolute inset-0">
            <img
              src={
                `http://localhost:5000/tmp/images/${props.sample10Imgs[props.selects[1]][1]}.jpg`
              }
              alt={props.sample10Imgs[props.selects[1]][0]}
              className="w-64 select-none"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <div className="text-white font-bold w-96 text-center leading-10">
          生成中… しばらく待ってね！
        </div>
      </section>
    </>
  )
}

export default WaitVideo;