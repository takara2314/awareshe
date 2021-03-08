import React from 'react';
import ServiceProps from '../models/ServiceProps';

const Result = (props: ServiceProps) => {
  return (
    <>
      <section className="text-center mx-auto mt-24">
        <h1 className="font-bold text-3xl">
          完成だね！
        </h1>
        おめでとう！今日から彼女はキミの子だ！やったね！
      </section>

      <section className="w-11/12 h-128 bg-white mx-auto mt-6 rounded-xl relative">
        <div className="w-96 h-96 m-auto absolute inset-0">
          <img
            src={`http://localhost:5000/${props.framePath.slice(2)}`}
            alt="完成した彼女の写真"
            className="w-96"
          />
        </div>
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <button
          className="text-white font-bold mx-auto rounded-xl focus:outline-none"
          onClick={() => {
            props.changeProcessForward(false);
            props.changeProcess('select30');
          }}
        >
          画像を選び直す
        </button>
        <button
          className="text-white font-bold mx-auto rounded-xl focus:outline-none"
          onClick={() => {
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