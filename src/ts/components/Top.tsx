import React from 'react';

const Top = () => {
  return (
    <>
      <section className="bg-red-500 text-white text-2xl h-32 mb-5">
        <h1 className="font-bold text-3xl">
          AwareShe
        </h1>
        <div>
          AIによって生み出された彼女の写真
        </div>
        <button>
          生み出してみる
        </button>
      </section>

      <section className="text-lg">
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