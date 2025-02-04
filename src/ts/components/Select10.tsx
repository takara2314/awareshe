import React, {useEffect, useState} from 'react';
import ServiceProps from '../models/ServiceProps';

const Select10 = (props: ServiceProps) => {
  // ロードリクエストが入っていたら、最初にロードする
  useEffect(() => {
    document.title = '次の中からお好みの2枚を選ぼう！ - AwareShe';

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

    // 現在の選択数と選択インデックスを更新
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

    // 現在の選択しているものの画像データを格納
    props.setSelects(temp);
    // ビデオ待ち画面に移行
    props.changeProcessForward(true);
    props.changeProcess('waitvideo');
  }

  return (
    <>
      <section className="text-center mx-auto mt-24">
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
                      : "w-44 border-8 border-white hover:border-pink-100"
                    }
                    onClick={() => {
                      if (props.isLoadedSamples) {
                        selectHandler(index);
                      }
                    }}
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
                      : "w-44 border-8 border-white hover:border-pink-100"
                    }
                    onClick={() => {
                      if (props.isLoadedSamples) {
                        selectHandler(index);
                      }
                    }}
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
        {props.isLoadedSamples
          ? <ButtonSection
              {...props}
              selected10Handler={selected10Handler}
            />
          : <div className="text-white font-bold w-96 text-center leading-10">
              生成中…
            </div>
        }
      </section>
    </>
  )
}

const ButtonSection = (props: ServiceProps & {selected10Handler: () => void}) => {
  return (
    <>
      <button
        className="text-white hover:text-gray-100 font-bold mx-auto focus:outline-none transition-all"
        onClick={() => {
          // 全て選択されてなかったら、再生成
          if (props.selectedNum !== 10) {
            props.setIsLoadedSamples(false);
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
            className="w-60 h-10 bg-red-800 hover:bg-red-900 text-white font-bold rounded-xl focus:outline-none transition-all"
            onClick={() => {props.selected10Handler()}}
          >
            この2枚にする
          </button>
        : <></>
      }
    </>
  );
}

export default Select10;
