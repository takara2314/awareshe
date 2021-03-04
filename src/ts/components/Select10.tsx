import React, {useEffect, useState} from 'react';
import ServiceProps from '../models/ServiceProps';
import getSamples from '../services/getSamples';

const Select10 = (props: ServiceProps) => {
  // 画像と関連付けられているシード値と強さ
  const [select10Imgs, setSelect10Imgs] = useState<string[][]>([
    ['サンプル画像1', '../public/images/sample1.webp'],
    ['サンプル画像2', '../public/images/sample1.webp'],
    ['サンプル画像3', '../public/images/sample1.webp'],
    ['サンプル画像4', '../public/images/sample1.webp'],
    ['サンプル画像5', '../public/images/sample1.webp'],
    ['サンプル画像6', '../public/images/sample1.webp'],
    ['サンプル画像7', '../public/images/sample1.webp'],
    ['サンプル画像8', '../public/images/sample1.webp'],
    ['サンプル画像9', '../public/images/sample1.webp'],
    ['サンプル画像10', '../public/images/sample1.webp']
  ]);
  const [select10Seeds, setSelect10Seeds] = useState<number[][]>([
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0]
  ]);
  const [select10Weights, setSelect10Weights] = useState<number[][]>([
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0],
    [10.0, 10.0]
  ]);

  // サンプル画像をロードしたかを収納
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // ページを読み込んだら、サンプルをロード
  useEffect(() => {
    loadSamples();
  }, []);

  // サンプルをサーバーから取得し、表示する画像集などに記録
  const loadSamples = (): void => {
    getSamples()
    .then(res => res.json())
    .then(
      (result: any) => {
        // デバッグ
        console.log(result);

        const tempSelect10Imgs: string[][] = Array(10);
        const tempSelect10Seeds: number[][] = Array(10);
        const tempSelect10Weights: number[][] = Array(10);

        for (let i = 0; i < 10; i++) {
          tempSelect10Imgs[i] = [
            `サンプル画像${i+1}`,
            result[`img${i}`].path
          ];
          tempSelect10Seeds[i] = [
            result[`img${i}`].seed1,
            result[`img${i}`].seed2
          ];
          tempSelect10Weights[i] = [
            result[`img${i}`].weight1,
            result[`img${i}`].weight2
          ];
        }

        // ロードしたものを格納
        setSelect10Imgs(tempSelect10Imgs);
        setSelect10Seeds(tempSelect10Seeds);
        setSelect10Weights(tempSelect10Weights);
        // ロードが終了したことを記録
        setIsLoaded(true);
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  return (
    <>
      <section className="flex flex-row justify-between w-72 mx-auto mt-4 mb-8 select-none">
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

      <section className="w-11/12 h-128 bg-white mx-auto mt-6 rounded-xl">
        <ul className="w-full h-full grid grid-cols-5 justify-items-center items-center">
          {select10Imgs.map((item: string[], index: number) =>
            <li key={index}>
              {isLoaded
                ? <img
                    src={item[1]}
                    alt={item[0]}
                    className="w-40"
                  />
                : <div
                    className="animate-pulse bg-pink-500 w-40 h-40"
                  />
              }
            </li>
          )}
        </ul>
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <button
          className="text-white font-bold mx-auto rounded-xl focus:outline-none"
          onClick={() => {
            setIsLoaded(false);
            loadSamples();
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
