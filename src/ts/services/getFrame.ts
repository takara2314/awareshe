import GetFramePost from '../models/GetFramePost';

const getFrame = (data: GetFramePost): Promise<Response> => {
  return fetch('http://localhost:5000/getframe', {
    method: 'POST',
    mode:   'cors',
    cache:  'no-cache',
    headers: {
      "Content-Type": "application/json"
    },
    body:   JSON.stringify(data),
  });
}

export default getFrame;