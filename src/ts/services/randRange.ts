// 範囲内でランダムな数値を返す
const randRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default randRange;