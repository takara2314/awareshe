import React, { useEffect } from 'react';
import ServiceProps from '../models/ServiceProps';

const Top = (props: ServiceProps) => {
  const sampleImgs: string[][] = [
    ["生成サンプル1", "../public/images/sample1.webp"],
    ["生成サンプル2", "../public/images/sample2.webp"],
    ["生成サンプル3", "../public/images/sample3.webp"],
    ["生成サンプル4", "../public/images/sample4.webp"],
    ["生成サンプル5", "../public/images/sample5.webp"]
  ];

  useEffect(() => {
    document.title = 'AwareShe';
  }, []);

  return (
    <>
      <section className="rounded-full bg-red-500 w-4096 h-4096 absolute -top-3968 minus-circle-50vw shadow-inner" />

      <section className="w-full text-white text-2xl text-center h-128 mb-5 absolute top-0">
        <h1 className="font-bold text-6xl pt-32">
          AwareShe
        </h1>
        <div className="mt-4">
          AIによって生み出された彼女の写真
        </div>
        <button
          className="bg-red-800 hover:bg-red-900 mt-36 text-white font-bold px-8 py-3 rounded-xl focus:outline-none transition-all"
          onClick={() => {
            props.setIsLoadRequest(true);
            props.changeProcessForward(true);
            props.changeProcess('select10');
          }}
        >
          生み出してみる
        </button>
      </section>

      <section className="w-256 pt-144 mx-auto">
        <div className="bg-gray-100 rounded-xl mb-10 p-6">
          <h1 className="font-bold text-2xl text-red-500 mb-2">
            AwareShe とは
          </h1>
          <p>
            2次元の彼女を作れるサイトです。
          </p>
          <p>
            お気に入りの子を二人選んで、自分好みの子を作ろう！
          </p>
          <p className="mb-3">
            作った画像はアイコンにでもしてあげてください。
          </p>
          <ul className="flex justify-between">
            {sampleImgs.map((item: string[], index: number) =>
              <li key={index}>
                <img
                  src={item[1]}
                  alt={item[0]}
                  className="w-40"
                />
              </li>
            )}
          </ul>
        </div>
        <div className="bg-gray-100 rounded-xl mb-10 p-6">
          <h1 className="font-bold text-2xl text-red-500 mb-2">
            生成する仕組み
          </h1>
          <p className="mb-3">
            GANを使ってるよ！かがくのちからってすげー！！
          </p>
          <img
            src="../public/images/generate-flow.webp"
            alt="生成フロー"
          />
        </div>
        <div className="bg-gray-100 rounded-xl mb-10 p-6">
          <h1 className="font-bold text-2xl text-red-500 mb-2">
            著作権
          </h1>
          <p>
            オープンソースの学習データを利用しているので、生成した画像は自由に使用することが可能です。
          </p>
          <p>
            使用した時点で、私たち(
            <a href="https://twitter.com/kosakae256">kosakae256</a>, <a href="https://twitter.com/takara2314">takara2314</a>
            )にポンデリングとシュークリームと寿司をおごる権利がつきます。おごってください！
          </p>
        </div>
      </section>

      <footer className="w-screen h-16 bg-red-500 text-white text-center table-cell align-middle">
        <small className="text-lg">
          &copy; 2021 <a href="https://twitter.com/kosakae256">kosakae256</a>, <a href="https://twitter.com/takara2314">takara2314</a>
        </small>
      </footer>
    </>
  );
}

export default Top;