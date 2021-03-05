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
    }
    tempArray[index] = !props.isSelecting[index];

    // let counter: number = 0;
    for (let i = 0; i < 10; i++) {
      if (tempArray[i]) {
        // もし選択されている状態なら、選択数をインクリメント
        tempNum++
      }
    }

    console.log(`now selection: ${tempNum}`);
    props.setSelectedNum(tempNum);
    props.setIsSelecting(tempArray);
  }

  // 選び終わり、次のセクションに進むとき
  const selected10Handler = () => {
    let temp: number[] = Array(2);
    let counter: number = 0;

    for (let i = 0; i < 10; i++) {
      if (props.isSelecting[i] && counter < 2) {
        temp[counter++] = i;
      }
    }

    props.setSelects(temp);
    props.changeProcess('waitvideo');
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
        <h1 className="text-6xl font-bold text-red-900">
          4
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
          {props.sample10Imgs.map((item: string[], index: number) =>
            <li key={index}>
              { // ロードされている画像ならば表示
                props.isLoadedSamples
                ? <img
                    src={`http://localhost:5000/tmp/images/${item[1]}.jpg`}
                    alt={item[0]}
                    className={props.isSelecting[index]
                      ? "w-44 border-8 border-pink-500"
                      : "w-44 p-2"
                    }
                    onClick={() => {selectHandler(index)}}
                  />

                : <></>
              }

              { // ロードされておらず、選択しているのであれば表示
                ((props.isLoadedSamples == false) && props.isSelecting[index])
                ? <img
                    src={`http://localhost:5000/tmp/images/${item[1]}.jpg`}
                    alt={item[0]}
                    className={props.isSelecting[index]
                      ? "w-44 border-8 border-pink-500"
                      : "w-44 p-2"
                    }
                    onClick={() => {selectHandler(index)}}
                  />
                : <></>
              }

              { // ロードされておらず、選択もされていないならグルグルを表示
                ((props.isLoadedSamples == false) && (props.isSelecting[index] == false))
                ? <div
                    className="animate-pulse bg-pink-500 w-44 h-44 p-2"
                  />
                : <></>
              }
            </li>
          )}
        </ul>
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <button
          className="text-white font-bold mx-auto focus:outline-none"
          onClick={() => {
            // 全て選択されてなかったら、再生成
            if (props.selectedNum !== 10) {
              props.loadSamples();
            }
          }}
        >
          再生成する
        </button>

        {props.selectedNum !== 2
          ? <div className="text-white font-bold w-60 text-center leading-10">
              {props.selectedNum == 0
                ? "あと2枚選択しよう"
                : ""
              }
              {props.selectedNum == 1
                ? "あと1枚選択しよう"
                : ""
              }
              {props.selectedNum > 2
                ? "2枚だけ選ぼう"
                : ""
              }
            </div>
          : <></>
        }

        {props.selectedNum === 2
          ? <button
              className="w-60 h-10 bg-red-800 text-white font-bold rounded-xl focus:outline-none"
              onClick={() => {selected10Handler()}}
            >
              この2枚にする
            </button>
          : <></>
        }
      </section>
    </>
  )
}

export default Select10;
