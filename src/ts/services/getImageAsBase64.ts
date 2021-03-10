const getImageAsBase64 = (path: string) => {
  const getData = (path: string) => {
    return fetch(`http://localhost:5000/${path.slice(2)}`, {
      method: 'GET',
      mode:   'cors',
      cache:  'no-cache'
    });
  }

  const toBlob = (result: Response) => {
    return new Promise<Blob>((resolve: (value: Promise<Blob>) => void) => {
      resolve(result.blob());
    });
  }

  const toBase64 = (result: Blob) => {
    return new Promise<string>((resolve: (value: string) => void) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        resolve(reader.result as string);
      });
      reader.readAsDataURL(result);
    });
  }

  return (
    getData(path)
    .then((result: Response) => toBlob(result))
    .then((result: Blob) => toBase64(result))
  );
}

export default getImageAsBase64;