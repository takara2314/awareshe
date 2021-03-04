import React from 'react';

const Top = () => {
  return (
    <>
      <section className="rounded-full bg-red-500 w-4096 h-4096 absolute -top-3968 minus-circle-50vw">
      </section>

      <section className="w-full text-white text-2xl text-center h-128 mb-5 absolute top-0">
        <h1 className="font-bold text-6xl mt-32">
          AwareShe
        </h1>
        <div className="mt-4">
          AIによって生み出された彼女の写真
        </div>
        <button className="mt-36">
          生み出してみる
        </button>
      </section>

      <section className="text-lg mt-128 pt-12">
        <div>
          <h1 className="font-bold text-2xl">
            AwareShe とは
          </h1>
          <p>
            kosakae256 によってつくられた、スーパーウルトラスペシャルなアイコン生成器♡
          </p>
        </div>
        <div>
          <h1 className="font-bold text-2xl">
            生成する仕組み
          </h1>
          <p>
            GANを使ってるよ！かがくのちからってすげー！！
          </p>
        </div>
        <div>
          <h1 className="font-bold text-2xl">
            著作権
          </h1>
          <p>
            オープンソースの学習データを使用しているので、著作権はないです。
          </p>
          <p>
            しいていうなら… Python…?
          </p>
        </div>
      </section>
    </>
  )
}

export default Top;