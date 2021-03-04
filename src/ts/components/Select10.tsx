import React from 'react';
import ServiceProps from '../models/ServiceProps';

const Select10 = (props: ServiceProps) => {
  return (
    <>
      <section className="flex flex-row justify-between w-72 mx-auto my-8 select-none">
        <h1 className="text-6xl font-bold text-white">
          1
        </h1>
        <h1 className="text-6xl font-bold text-red-900">
          2
        </h1>
        <h1 className="text-6xl font-bold text-red-900">
          3
        </h1>
      </section>

      <section className="text-center mx-auto">
        <h1 className="font-bold text-3xl">
          次の中からお好みの2枚を選ぼう！
        </h1>
        画像を生成する参考として使うよ！
      </section>

      <section className="w-11/12 h-128 bg-white mx-auto mt-6">
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <button
          className="text-white font-bold mx-auto rounded-xl focus:outline-none"
          onClick={() => {
            props.changeProcess('select30');
          }}
        >
          再生成する
        </button>

        <button
          className="w-60 h-10 bg-red-800 text-white font-bold rounded-xl focus:outline-none"
          onClick={() => {
            props.changeProcess('select30');
          }}
        >
          この2枚にする
        </button>
      </section>
    </>
  )
}

export default Select10;