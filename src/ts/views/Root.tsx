import React, { useEffect, useRef, useState } from 'react';
import Top from '../components/Top';
import Select10 from '../components/Select10';

const Root = () => {
  const [process, setProcess] = useState<string>('none');

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
      : 'flex flex-col bg-red-500 text-lg text-white overflow-hidden'
    );
  }

  const mainObj: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  return (
    <main className={mainElementClass()} ref={mainObj}>
      {process == 'none'
        ? <Top
            process={process}
            changeProcess={setProcess}
          />
        : <></>
      }
      {process == 'select10'
        ? <Select10
            process={process}
            changeProcess={setProcess}
          />
        : <></>
      }
    </main>
  )
}

export default Root;