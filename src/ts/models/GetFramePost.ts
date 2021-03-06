interface GetFramePost {
  img1:  ImgData;
  img2:  ImgData;
  frame: number;
}

interface ImgData {
  path:    string;
  seed1:   number;
  seed2:   number;
  weight1: number;
  weight2: number;
}

export default GetFramePost;