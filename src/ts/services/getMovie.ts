import GetMoviePost from '../models/GetMoviePost';

const getMovie = (data: GetMoviePost): Promise<Response> => {
  return fetch('http://localhost:5000/getmovie', {
    method: 'POST',
    mode:   'cors',
    cache:  'no-cache',
    headers: {
      "Content-Type": "application/json"
    },
    body:   JSON.stringify(data),
  });
}

export default getMovie;