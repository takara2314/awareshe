import React, { useEffect, useRef, useState } from 'react';
import Top from '../components/Top';
import Select10 from '../components/Select10';
import Select30 from '../components/Select30';
import Result from '../components/Result';
import getSamples from '../services/getSamples';

const Root = () => {
  const [process, setProcess] = useState<string>('select10');

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

  // サンプルをサーバーからロードするリクエストがあるか
  const [isLoadRequest, setIsLoadRequest] = useState<boolean>(false);

  // サンプル画像をロードしたかを収納
  const [isLoadedSamples, setIsLoadedSamples] = useState<boolean>(false);

  // 選んだ画像のインデックスと個数
  const [selects, setSelects] = useState<number[]>([-1, -1]);
  const [selectedNum, setSelectedNum] = useState<number>(0);

  // 選択しているか否か
  const [isSelecting, setIsSelecting] = useState<boolean[]>([
    false, false, false, false, false, false, false, false, false, false,
  ]);

  // 選択したフレーム数
  const [videoFrame, setVideoFrame] = useState<number>(15);

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
          // 選択されているものであれば、元のものを使用
          if (isSelecting[i]) {
            tempSelect10Imgs[i] = select10Imgs[i];
            tempSelect10Seeds[i] = select10Seeds[i];
            tempSelect10Weights[i] = select10Weights[i];

          } else {
            tempSelect10Imgs[i] = [
              `サンプル画像${i+1}`,
              `http://localhost:5000/tmp/images/${result[`img${i}`].path}.jpg`
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
        }

        // ロードしたものを格納
        setSelect10Imgs(tempSelect10Imgs);
        setSelect10Seeds(tempSelect10Seeds);
        setSelect10Weights(tempSelect10Weights);
        // ロードが終了したことを記録
        setIsLoadedSamples(true);
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  // ロード時とリサイズ時に、ブラウザザイズをフルにする
  useEffect(() => {
    window.addEventListener('load', () => {
      changeWindowSize();
    });
    window.addEventListener('resize', () => {
      changeWindowSize();
    });
  }, []);

  // main要素の大きさを縦横フルに
  const changeWindowSize = () => {
    mainObj.current!.style.width = `${window.innerWidth}px`;
    mainObj.current!.style.height = `${window.innerHeight}px`;
  }

  // main要素のクラス
  const mainElementClass = (): string => {
    return (
      process == 'none'
      ? 'text-lg overflow-x-hidden relative'
      : 'flex flex-col justify-center bg-red-500 text-lg text-white overflow-hidden'
    );
  }

  const mainObj: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  return (
    <main className={mainElementClass()} ref={mainObj}>
      {process == 'none'
        ? <Top
            process={process}
            changeProcess={setProcess}
            loadSamples={loadSamples}
            isLoadedSamples={isLoadedSamples}
            setIsLoadedSamples={setIsLoadedSamples}

            isLoadRequest={isLoadRequest}
            setIsLoadRequest={setIsLoadRequest}

            select10Imgs={select10Imgs}
            setSelect10Imgs={setSelect10Imgs}
            select10Seeds={select10Seeds}
            setSelect10Seeds={setSelect10Seeds}
            select10Weights={select10Weights}
            setSelect10Weights={setSelect10Weights}

            selects={selects}
            setSelects={setSelects}
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}

            videoFrame={videoFrame}
            setVideoFrame={setVideoFrame}
          />
        : <></>
      }
      {process == 'select10'
        ? <Select10
            process={process}
            changeProcess={setProcess}
            loadSamples={loadSamples}
            isLoadedSamples={isLoadedSamples}
            setIsLoadedSamples={setIsLoadedSamples}

            isLoadRequest={isLoadRequest}
            setIsLoadRequest={setIsLoadRequest}

            select10Imgs={select10Imgs}
            setSelect10Imgs={setSelect10Imgs}
            select10Seeds={select10Seeds}
            setSelect10Seeds={setSelect10Seeds}
            select10Weights={select10Weights}
            setSelect10Weights={setSelect10Weights}

            selects={selects}
            setSelects={setSelects}
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}

            videoFrame={videoFrame}
            setVideoFrame={setVideoFrame}
          />
        : <></>
      }
      {process == 'select30'
        ? <Select30
            process={process}
            changeProcess={setProcess}
            loadSamples={loadSamples}
            isLoadedSamples={isLoadedSamples}
            setIsLoadedSamples={setIsLoadedSamples}

            isLoadRequest={isLoadRequest}
            setIsLoadRequest={setIsLoadRequest}

            select10Imgs={select10Imgs}
            setSelect10Imgs={setSelect10Imgs}
            select10Seeds={select10Seeds}
            setSelect10Seeds={setSelect10Seeds}
            select10Weights={select10Weights}
            setSelect10Weights={setSelect10Weights}

            selects={selects}
            setSelects={setSelects}
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}

            videoFrame={videoFrame}
            setVideoFrame={setVideoFrame}
          />
        : <></>
      }
      {process == 'result'
        ? <Result
            process={process}
            changeProcess={setProcess}
            loadSamples={loadSamples}
            isLoadedSamples={isLoadedSamples}
            setIsLoadedSamples={setIsLoadedSamples}

            isLoadRequest={isLoadRequest}
            setIsLoadRequest={setIsLoadRequest}

            select10Imgs={select10Imgs}
            setSelect10Imgs={setSelect10Imgs}
            select10Seeds={select10Seeds}
            setSelect10Seeds={setSelect10Seeds}
            select10Weights={select10Weights}
            setSelect10Weights={setSelect10Weights}

            selects={selects}
            setSelects={setSelects}
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}

            videoFrame={videoFrame}
            setVideoFrame={setVideoFrame}
          />
        : <></>
      }
    </main>
  )
}

export default Root;