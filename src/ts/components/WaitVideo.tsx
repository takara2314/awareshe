import React, { useEffect, useState } from 'react';
import ServiceProps from '../models/ServiceProps';
import getMovie from '../services/getMovie';
import GetMoviePost from '../models/GetMoviePost';
import { Transition, TransitionStatus } from 'react-transition-group';
import koigoeTransitionStyle from '../animations/koigoeTranslation';
import preload from '../services/preload';
import randRange from '../services/randRange';
import generateKoigoe from '../services/generateKoigoe';

const WaitVideo = (props: ServiceProps) => {
  // top-0 | top-2 | top-4 | top-8 | top-10 | top-16 | top-20 | top-24 | top-32 | top-40 | top-64 | top-72 | top-80
  // right-0 | right-2 | right-4 | right-8 | right-10 | right-16 | right-20 | right-24 | right-32 | right-40 | right-64 | right-72 | right-80
  // bottom-0 | bottom-2 | bottom-4 | bottom-8 | bottom-10 | bottom-16 | bottom-20 | bottom-24 | bottom-32 | bottom-40 | bottom-64 | bottom-72 | bottom-80
  // left-0 | left-2 | left-4 | left-8 | left-10 | left-16 | left-20 | left-24 | left-32 | left-40 | left-64 | left-72 | left-80
  const koigoePos = [0, 2, 4, 6, 8, 10, 16, 20, 24, 32, 40, 64, 72, 80];

  const [leftKoigoe, setLeftKoigoe] = useState<string>('');
  const [rightKoigoe, setRightKoigoe] = useState<string>('');

  const [isLeftKoigoe, setIsLeftKoigoe] = useState<boolean>(false);
  const [isRightKoigoe, setIsRightKoigoe] = useState<boolean>(false);

  const [leftKoigoeClass, setLeftKoigoeClass] = useState<string>('');
  const [rightKoigoeClass, setRightKoigoeClass] = useState<string>('');

  useEffect(() => {
    if (isLeftKoigoe) {
      setLeftKoigoe(generateKoigoe());
    }
  }, [isLeftKoigoe]);

  useEffect(() => {
    if (isRightKoigoe) {
      setRightKoigoe(generateKoigoe());
    }
  }, [isRightKoigoe]);

  useEffect(() => {
    document.title = '彼女を生み出しています… - AwareShe';

    // 動画を生成
    loadMovie();

    // JKゴシックをプリロード
    preload(
      '/fonts/JKGothic-Medium.ttf',
      'font',
      'font/ttf'
    );

    // 不定期に左の子に恋声を出させる
    setTimeout(() => {
      leftSayKoigoe(4000);
      setInterval(() => {
        leftSayKoigoe(4000);
      }, 10000);
    }, randRange(3000, 6000));

    // 不定期に右の子に恋声を出させる
    setTimeout(() => {
      rightSayKoigoe(4000);
      setInterval(() => {
        rightSayKoigoe(4000);
      }, 10000);
    }, randRange(3000, 6000));
  }, []);

  // 左の子に恋声を出させる
  const leftSayKoigoe = (duration: number) => {
    setLeftKoigoeClass([
      'h-10',
      'text-black',
      'text-xl',
      'font-jk',
      'absolute',
      `top-${koigoePos[randRange(10, 14)]}`,
      `right-${koigoePos[randRange(7, 14)]}`,
      `bottom-${koigoePos[randRange(0, 6)]}`,
      `left-${koigoePos[randRange(0, 5)]}`
    ].join(' '));

    // 発声
    setIsLeftKoigoe(true);
    setTimeout(() => {
      setIsLeftKoigoe(false);
    }, duration);
  }

  // 右の子に恋声を出させる
  const rightSayKoigoe = (duration: number) => {
    setRightKoigoeClass([
      'h-10',
      'text-black',
      'text-xl',
      'font-jk',
      'absolute',
      `top-${koigoePos[randRange(10, 14)]}`,
      `right-${koigoePos[randRange(0, 5)]}`,
      `bottom-${koigoePos[randRange(0, 6)]}`,
      `left-${koigoePos[randRange(7, 14)]}`
    ].join(' '));

    // 発声
    setIsRightKoigoe(true);
    setTimeout(() => {
      setIsRightKoigoe(false);
    }, duration);
  }

  // 動画をサーバーから取得
  const loadMovie = (): void => {
    let postData: GetMoviePost = {
      img1: {
        path:    props.sample10Imgs[props.selects[0]][1],
        seed1:   props.sample10Seeds[props.selects[0]][0],
        seed2:   props.sample10Seeds[props.selects[0]][1],
        weight1: props.sample10Weights[props.selects[0]][0],
        weight2: props.sample10Weights[props.selects[0]][1]
      },
      img2: {
        path:    props.sample10Imgs[props.selects[1]][1],
        seed1:   props.sample10Seeds[props.selects[1]][0],
        seed2:   props.sample10Seeds[props.selects[1]][1],
        weight1: props.sample10Weights[props.selects[1]][0],
        weight2: props.sample10Weights[props.selects[1]][1]
      }
    };

    // 動画(mp4)を取得
    getMovie(postData)
    .then(res => res.text())
    .then(
      (result: string) => {
        props.setVideoPath(result);
        props.changeProcessForward(true);
        props.changeProcess('select30');
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  return (
    <>
      <section className="text-center mx-auto mt-24">
        <h1 className="font-bold text-3xl">
          彼女を生み出しています…
        </h1>
        少し待ってね！さっき選んでもらった画像を参考に、彼女を生み出しているよ！
      </section>

      <section className="w-11/12 h-128 bg-white mx-auto mt-6 rounded-xl grid grid-cols-2 justify-items-center items-center">
        <div className="w-full h-full relative">
          <div className="animate-pulse bg-pink-500 w-80 h-80 m-auto rounded-3xl absolute inset-0" />
          <div className="w-64 h-64 m-auto absolute inset-0">
            <img
              src={
                `http://localhost:5000/tmp/images/${props.sample10Imgs[props.selects[0]][1]}.jpg`
              }
              alt={props.sample10Imgs[props.selects[0]][0]}
              className="w-64 select-none"
              onClick={() => {setIsLeftKoigoe(!isLeftKoigoe)}}
            />
          </div>

          <Transition
            in={isLeftKoigoe}
            timeout={{enter: 0, exit: 1000}}
            mountOnEnter unmountOnExit
          >
            {(state: TransitionStatus) =>
              <div
                style={koigoeTransitionStyle[state]}
                className={leftKoigoeClass}
              >
                {leftKoigoe}
              </div>
            }
          </Transition>
        </div>

        <div className="w-full h-full relative">
          <div className="animate-pulse bg-pink-500 w-80 h-80 m-auto rounded-3xl absolute inset-0" />
          <div className="w-64 h-64 m-auto absolute inset-0">
            <img
              src={
                `http://localhost:5000/tmp/images/${props.sample10Imgs[props.selects[1]][1]}.jpg`
              }
              alt={props.sample10Imgs[props.selects[1]][0]}
              className="w-64 select-none"
              onClick={() => {setIsRightKoigoe(!isRightKoigoe)}}
            />
          </div>

          <Transition
            in={isRightKoigoe}
            timeout={{enter: 0, exit: 1000}}
            mountOnEnter unmountOnExit
          >
            {(state: TransitionStatus) =>
              <div
                style={koigoeTransitionStyle[state]}
                className={rightKoigoeClass}
              >
                {rightKoigoe}
              </div>
            }
          </Transition>
        </div>
      </section>

      <section className="flex flex-row justify-between w-96 h-10 mt-5 mx-auto">
        <div className="text-white font-bold w-96 text-center leading-10">
          生成中… しばらく待ってね！
        </div>
      </section>
    </>
  );
}

export default WaitVideo;