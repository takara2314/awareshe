const getSamples = (): Promise<Response> => {
  return fetch('http://localhost:5000/get10image', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache'
  });
}

export default getSamples;