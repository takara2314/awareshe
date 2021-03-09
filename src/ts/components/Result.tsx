import React, { useEffect } from 'react';
import ServiceProps from '../models/ServiceProps';

const Result = (props: ServiceProps) => {
  useEffect(() => {
    document.title = '完成だね！ - AwareShe';
  }, [props.isTwoShot]);

  return (
    <>
      <section className="text-center mx-auto mt-24">
        <h1 className="font-bold text-3xl">
          完成だね！
        </h1>
        おめでとう！今日から彼女はキミの子だ！やったね！
      </section>

      <section className="w-11/12 h-128 bg-white text-black mx-auto mt-6 rounded-xl flex flex-col justify-center">
        <section className="w-96 h-96 m-auto">
          {props.isLoadedFrame
            ? <img
                src={`http://localhost:5000/${props.framePath.slice(2)}`}
                alt="完成した彼女の写真"
                className="w-96"
              />
            : <div
                className="animate-pulse bg-pink-500 w-96 h-96"
              />
          }
        </section>
        <section className="flex flex-row justify-between w-128 h-10 mb-5 mx-auto">
          {props.isLoadedFrame
            ? <>
                <button
                  className="w-60 h-10 bg-pink-800 hover:bg-pink-900 text-white font-bold rounded-xl focus:outline-none transition-all"
                  onClick={() => {props.setIsTwoShot(true)}}
                >
                  ツーショットを撮る♡
                </button>
                <a
                  href={`http://localhost:5000/${props.framePath.slice(2)}`}
                  download="彼女.png"
                  className="w-60 h-10 text-center leading-10 bg-red-800 hover:bg-red-900 text-white font-bold rounded-xl focus:outline-none transition-all"
                >
                  画像をダウンロード
                </a>
              </>
            : <div className="text-black font-bold w-96 m-auto text-center leading-10">
                もう少し待ってね！
              </div>
          }
        </section>
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <button
          className="text-white hover:text-gray-100 font-bold mx-auto rounded-xl focus:outline-none transition-all"
          onClick={() => {
            props.changeProcessForward(false);
            props.changeProcess('select30');
            props.setIsLoadedFrame(false);
          }}
        >
          画像を選び直す
        </button>
        <button
          className="text-white hover:text-gray-100 font-bold mx-auto rounded-xl focus:outline-none transition-all"
          onClick={() => {
            // サンプル画像の選択情報を初期化
            const temp: boolean[] = Array<boolean>(10);
            for (let i = 0; i < 10; i++) {
              temp[i] = false;
            }
            props.setIsSelecting(temp);
            props.setIsLoadedSamples(false);

            props.changeProcessForward(true);
            props.changeProcess('none');
          }}
        >
          トップページに戻る
        </button>
      </section>
    </>
  );
}

export default Result;