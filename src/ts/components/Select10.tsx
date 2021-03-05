import React, {useEffect, useState} from 'react';
import ServiceProps from '../models/ServiceProps';

const Select10 = (props: ServiceProps) => {
  // ロードリクエストが入っていたら、最初にロードする
  useEffect(() => {
    if (props.isLoadRequest) {
      props.loadSamples();
    }
    props.setIsLoadRequest(false);
  }, []);

  // 画像選択時に行う処理
  const selectHandler = (index: number): void => {
    let tempNum: number = 0;
    const tempArray: boolean[] = Array(10);

    for (let i = 0; i < 10; i++) {
      tempArray[i] = props.isSelecting[i];
      // もし選択されている状態なら、選択数をインクリメント
      if (tempArray[i]) {
        tempNum++;
      }
    }

    tempArray[index] = !props.isSelecting[index];
    // もし選択するのであれば、選択数をインクリメント
    if (tempArray[index]) {
      tempNum++;
    }

    props.setSelectedNum(tempNum);
    props.setIsSelecting(tempArray);
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
          {props.select10Imgs.map((item: string[], index: number) =>
            <li key={index}>
              {props.isLoadedSamples
                ? <img
                    src={item[1]}
                    alt={item[0]}
                    className={props.isSelecting[index]
                      ? "w-44 border-8 border-pink-500"
                      : "w-44 border-8 border-white"
                    }
                    onClick={() => {selectHandler(index)}}
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
            props.setIsLoadedSamples(false);
            props.loadSamples();
          }}
        >
          再生成する
        </button>

        <button
          className={props.selectedNum == 2
            ? "w-60 h-10 bg-red-800 text-white font-bold rounded-xl focus:outline-none"
            : "w-60 h-10 bg-gray-800 text-white font-bold rounded-xl focus:outline-none"
          }
          onClick={() => {
            props.changeProcess('select30');
          }}
        >
          {props.selectedNum == 0
            ? "あと2枚選択しよう"
            : ""
          }
          {props.selectedNum == 1
            ? "あと1枚選択しよう"
            : ""
          }
          {props.selectedNum == 2
            ? "この2枚にする"
            : ""
          }
          {props.selectedNum > 2
            ? "2枚だけ選ぼう"
            : ""
          }
        </button>
      </section>
    </>
  )
}

export default Select10;
