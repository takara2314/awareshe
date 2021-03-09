import getImageAsBase64 from "./getImageAsBase64";

const generateTwoShot = (photoSrc: string, girlPath: string, percentage: number) => {
  const task1 = (basePath: string) => {
    return new Promise<HTMLImageElement[]>((resolve: (value: HTMLImageElement[]) => void) => {
      const canvas = document.createElement('canvas');

      canvas.width = 1920;
      canvas.height = 1080;

      const photoImg = new Image();
      photoImg.src = basePath;

      const girlImg = new Image();
      getImageAsBase64(girlPath)
      .then((result: string) => {
        girlImg.src = result;
        resolve([photoImg, girlImg]);
      })
    });
  }

  const task2 = (result: HTMLImageElement[]) => {
    return new Promise<HTMLImageElement[]>((resolve: (value: HTMLImageElement[]) => void) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1920 * result[0].height / result[0].width;
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(
        result[0],
        0,
        0,
        result[0].width,
        result[0].height,
        0,
        0,
        1920,
        1920 * result[0].height / result[0].width
      );

      const img: HTMLImageElement = new Image();
      img.src = canvas.toDataURL();

      resolve([img, result[1]]);
    });
  }

  const task3 = (result: HTMLImageElement[]) => {
    return new Promise<HTMLImageElement[]>((resolve: (value: HTMLImageElement[]) => void) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      ctx!.drawImage(
        result[0],
        0,
        result[0].height - 1080,
        1920,
        1080,
        0,
        0,
        1920,
        1080
      );

      const img: HTMLImageElement = new Image();
      img.src = canvas.toDataURL();

      resolve([img, result[1]]);
    });
  }

  const task4 = (result: HTMLImageElement[]) => {
    return new Promise<HTMLImageElement>((resolve: (value: HTMLImageElement) => void) => {
      result[1].addEventListener('load', () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        ctx!.drawImage(
          result[0],
          0,
          0,
          1920,
          1080,
          0,
          0,
          1920,
          1080
        );

        const factGirlSize: number = 1080 * percentage;

        ctx!.drawImage(
          result[1],
          0,
          0,
          result[1].width,
          result[1].height,
          1920 - factGirlSize,
          1080 - factGirlSize,
          factGirlSize,
          factGirlSize
        );

        const img: HTMLImageElement = new Image();
        img.src = canvas.toDataURL();

        resolve(img);
      });
    });
  }

  return (
    task1(photoSrc)
    .then((result: HTMLImageElement[]) => task2(result))
    .then((result: HTMLImageElement[]) => task3(result))
    .then((result: HTMLImageElement[]) => task4(result))
  );
}

export default generateTwoShot;