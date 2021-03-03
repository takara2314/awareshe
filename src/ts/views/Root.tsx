import React, { useEffect, useRef } from 'react';

const Root = () => {
  useEffect(() => {
    window.addEventListener('load', () => {
      changeWindowSize();
    });
    window.addEventListener('resize', () => {
      changeWindowSize();
    });
  }, []);

  const changeWindowSize = () => {
    mainObj.current!.style.width = `${window.innerWidth}px`;
    mainObj.current!.style.height = `${window.innerHeight}px`;
  }

  const mainObj: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  return (
    <main
      className="flex flex-col items-center justify-around text-4xl bg-red-500 text-white text-center"
      ref={mainObj}
    >
      <h1 className="text-6xl font-bold">
        AwareShe
      </h1>
      <section>
        <p>
          乞うご期待…
        </p>
        <p className="text-2xl text-gray-100">
          <a href="https://twitter.com/takara2314">
            takara2314
          </a>
        </p>
        <p className="text-2xl text-gray-100">
          <a href="https://twitter.com/kosakae256">
            kosakae256
          </a>
        </p>
      </section>
    </main>
  )
}

export default Root;