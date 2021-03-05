import React, { useEffect, useRef, useState } from 'react';
import Top from '../components/Top';
import Select10 from '../components/Select10';
import WaitVideo from '../components/WaitVideo';
import Select30 from '../components/Select30';
import Result from '../components/Result';
import getSamples from '../services/getSamples';

const Root = () => {
  const [process, setProcess] = useState<string>('select10');

  // 画像と関連付けられているシード値と強さ
  const [sample10Imgs, setSample10Imgs] = useState<string[][]>([
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
  const [sample10Seeds, setSample10Seeds] = useState<number[][]>([
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
  const [sample10Weights, setSample10Weights] = useState<number[][]>([
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

        const tempSample10Imgs: string[][] = Array(10);
        const tempSample10Seeds: number[][] = Array(10);
        const tempSample10Weights: number[][] = Array(10);

        for (let i = 0; i < 10; i++) {
          // 選択されているものであれば、元のものを使用
          if (isSelecting[i]) {
            tempSample10Imgs[i] = sample10Imgs[i];
            tempSample10Seeds[i] = sample10Seeds[i];
            tempSample10Weights[i] = sample10Weights[i];

          } else {
            tempSample10Imgs[i] = [
              `サンプル画像${i+1}`,
              `http://localhost:5000/tmp/images/${result[`img${i}`].path}.jpg`
            ];
            tempSample10Seeds[i] = [
              result[`img${i}`].seed1,
              result[`img${i}`].seed2
            ];
            tempSample10Weights[i] = [
              result[`img${i}`].weight1,
              result[`img${i}`].weight2
            ];
          }
        }

        // ロードしたものを格納
        setSample10Imgs(tempSample10Imgs);
        setSample10Seeds(tempSample10Seeds);
        setSample10Weights(tempSample10Weights);
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

            sample10Imgs={sample10Imgs}
            setSample10Imgs={setSample10Imgs}
            sample10Seeds={sample10Seeds}
            setSample10Seeds={setSample10Seeds}
            sample10Weights={sample10Weights}
            setSample10Weights={setSample10Weights}

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

            sample10Imgs={sample10Imgs}
            setSample10Imgs={setSample10Imgs}
            sample10Seeds={sample10Seeds}
            setSample10Seeds={setSample10Seeds}
            sample10Weights={sample10Weights}
            setSample10Weights={setSample10Weights}

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
      {process == 'waitvideo'
        ? <WaitVideo
            process={process}
            changeProcess={setProcess}
            loadSamples={loadSamples}
            isLoadedSamples={isLoadedSamples}
            setIsLoadedSamples={setIsLoadedSamples}

            isLoadRequest={isLoadRequest}
            setIsLoadRequest={setIsLoadRequest}

            sample10Imgs={sample10Imgs}
            setSample10Imgs={setSample10Imgs}
            sample10Seeds={sample10Seeds}
            setSample10Seeds={setSample10Seeds}
            sample10Weights={sample10Weights}
            setSample10Weights={setSample10Weights}

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

            sample10Imgs={sample10Imgs}
            setSample10Imgs={setSample10Imgs}
            sample10Seeds={sample10Seeds}
            setSample10Seeds={setSample10Seeds}
            sample10Weights={sample10Weights}
            setSample10Weights={setSample10Weights}

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

            sample10Imgs={sample10Imgs}
            setSample10Imgs={setSample10Imgs}
            sample10Seeds={sample10Seeds}
            setSample10Seeds={setSample10Seeds}
            sample10Weights={sample10Weights}
            setSample10Weights={setSample10Weights}

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