import React, { useEffect, useRef, useState } from 'react';
import getSamples from '../services/getSamples';
import GeneratePanel from './GeneratePanel';

const Root = () => {
  const [process, setProcess] = useState<string>('none');
  const [processForward, setProcessForward] = useState<boolean>(true);

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

  // ビデオのパス
  const [videoPath, setVideoPath] = useState<string>('');

  // 選択したフレーム数
  const [videoFrame, setVideoFrame] = useState<number>(15);

  // 完成した画像のパス
  const [framePath, setFramePath] = useState<string>('');
  // 完成した画像をロードしたか
  const [isLoadedFrame, setIsLoadedFrame] = useState<boolean>(false);

  // ツーショット画面を表示するか
  const [isTwoShot, setIsTwoShot] = useState<boolean>(false);

  // サンプルをサーバーから取得し、表示する画像集などに記録
  const loadSamples = (): void => {
    getSamples()
    .then(res => res.json())
    .then(
      (result: any) => {
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
              result[`img${i}`].path
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
      : 'flex flex-col justify-center bg-red-500 text-lg text-white overflow-hidden relative'
    );
  }

  const mainObj: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  return (
    <main className={mainElementClass()} ref={mainObj}>
      <GeneratePanel
        process={process}
        changeProcess={setProcess}

        processForward={processForward}
        changeProcessForward={setProcessForward}

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

        videoPath={videoPath}
        setVideoPath={setVideoPath}

        videoFrame={videoFrame}
        setVideoFrame={setVideoFrame}

        framePath={framePath}
        setFramePath={setFramePath}
        isLoadedFrame={isLoadedFrame}
        setIsLoadedFrame={setIsLoadedFrame}

        isTwoShot={isTwoShot}
        setIsTwoShot={setIsTwoShot}
      />
    </main>
  );
}

export default Root;