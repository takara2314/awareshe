import React, { useEffect, useRef } from 'react';
import Top from '../components/Top';

const Root = () => {
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

  const mainObj: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  return (
    <main className="overflow-x-hidden relative" ref={mainObj}>
      <Top />
    </main>
  )
}

export default Root;