import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import ServiceProps from '../models/ServiceProps';
import generateTwoShot from '../services/generateTwoShot';
import { Transition, TransitionStatus } from 'react-transition-group';
import twoshootTransitionStyle from '../animations/twoshootTransition';

const TwoShot = (props: ServiceProps) => {
  const webcamObj = useRef<Webcam>(null);

  const menuObj: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const cameraSection: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const girlObj: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [cameraAve, setCameraAve] = useState<boolean>(false);

  const [isTwoshoot, setIsTwoshoot] = useState<boolean>(false);

  const [twoshotImg, setTwoshotImg] = useState<string>('');

  useEffect(() => {
    document.title = 'ツーショット - AwareShe';

    changeElementSize();
    window.addEventListener('load', () => {
      changeElementSize();
    });
    window.addEventListener('resize', () => {
      changeElementSize();
    });
  }, [cameraAve]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {facingMode: "user"}
    })
    .then(
      () => {
        setCameraAve(true);
      },
      () => {
        setCameraAve(false);
      }
    );
  }, []);

  // main要素の大きさを縦横フルに
  const changeElementSize = () => {
    if (menuObj.current!.clientWidth / menuObj.current!.clientHeight >= 16/9) {
      cameraSection.current!.style.width = `${menuObj.current!.clientHeight * 16/9}px`;
      cameraSection.current!.style.height = `${menuObj.current!.clientHeight * 16/9}px`;
    } else {
      cameraSection.current!.style.width = `${menuObj.current!.clientWidth}px`;
      cameraSection.current!.style.height = `${menuObj.current!.clientWidth}px`;
    }

    if (cameraAve) {
      girlObj.current!.style.width = `${menuObj.current!.clientHeight * 2/3}px`;
      girlObj.current!.style.height = `${menuObj.current!.clientHeight * 2/3}px`;
    }
  }

  const shotHandler = () => {
    const imgSrc: string = webcamObj.current!.getScreenshot() as string;

    generateTwoShot(
      imgSrc,
      props.framePath,
      2/3
    )
    .then((result: HTMLImageElement) => {
      setTwoshotImg(result.src);
      setIsTwoshoot(true);
    });
  }

  return (
    <section
      className={cameraAve
        ? "w-full h-full text-black bg-black rounded-xl flex flex-row justify-center overflow-hidden relative"
        : "w-full h-full text-black bg-white rounded-xl flex flex-row justify-center overflow-hidden relative"
      }
      ref={menuObj}
    >
      <section
        className="w-144 h-144 relative"
        ref={cameraSection}
      >
        {cameraAve
          ? <div className="w-full h-9/16 overflow-y-hidden absolute top-0">
              <Webcam
                audio={false}
                ref={webcamObj}
                width={1920}
                height={1080}
                screenshotFormat="image/png"
                onUserMediaError={() => {setCameraAve(false)}}
                className="w-full absolute inset-x-0 bottom-0"
              />
              <div
                className="absolute right-0 bottom-0"
                ref={girlObj}
              >
                <img
                  src={`http://localhost:5000/${props.framePath.slice(2)}`}
                  alt="完成した彼女の写真"
                  className="w-full select-none"
                />
              </div>
              <div
                className="w-20 h-20 bg-gray-300 hover:bg-gray-400 border-8 border-white rounded-full m-auto absolute inset-x-0 bottom-5 transition-all"
                onClick={() => {shotHandler()}}
              />
            </div>
          : <section className="text-3xl p-8">
              <h1 className="font-bold text-4xl pt-6 mb-5">
                彼女とツーショットしよう♪
              </h1>
              <p className="my-3 text-red-700">
                ここでは、生み出した彼女とツーショットができちゃう！！
              </p>
              <p className="my-3">
                内カメラの映像を利用するので、この機能を利用するためには、カメラを許可する必要があります。
              </p>
              <p className="my-3">
                安心してください！
                <span className="text-red-700">
                  カメラの映像はサーバーに送信されない
                </span>
                ので、あんなことをしても誰かにバレません！
              </p>

              <div className="bg-yellow-200 w-full rounded-xl p-7 mt-5 border-4 border-yellow-300">
                <h1 className="font-bold text-4xl mb-5">
                  許可したのにカメラ画面に移動しない場合
                </h1>
                <ul className="list-disc ml-5">
                  <li className="my-3 pl-2">
                    この画面が開いてから、数秒経ちましたか？
                  </li>
                  <li className="my-3 pl-2">
                    同じカメラを他のアプリやサイトで使用していませんか？
                  </li>
                  <li className="my-3 pl-2">
                    カメラに異常はありませんか？
                  </li>
                </ul>
              </div>
            </section>
        }
      </section>

      <Transition
        in={isTwoshoot}
        timeout={{enter: 0, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={twoshootTransitionStyle[state]}
            className="text-black text-lg bg-white rounded-xl shadow-2xl p-5 w-72 h-54 absolute bottom-5 left-5"
          >
            <h1 className="font-bold text-xl">
              撮影しました！
            </h1>
            <p className="text-blue-700">
              <a
                href={twoshotImg}
                download="ツーショット.png"
              >
                ダウンロードする
              </a>
            </p>
            <img
              src={twoshotImg}
              alt="ツーショット画像"
              className="w-full mt-2 border-gray-100 border-4"
            />
          </div>
        }
      </Transition>

      <section
        className="text-7xl font-bold text-gray-500 hover:text-gray-600 absolute top-2 right-6 select-none transition-all"
        onClick={() => {props.setIsTwoShot(false)}}
      >
        ×
      </section>
    </section>
  );
}

export default TwoShot;