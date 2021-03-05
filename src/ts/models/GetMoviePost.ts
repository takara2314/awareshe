interface GetMoviePost {
  img1: ImgData;
  img2: ImgData;
}

interface ImgData {
  path:    string;
  seed1:   number;
  seed2:   number;
  weight1: number;
  weight2: number;
}

export default GetMoviePost;