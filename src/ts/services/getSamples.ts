const getSamples = (): Promise<Response> => {
  return fetch('./get10image', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache'
  });
}

export default getSamples;