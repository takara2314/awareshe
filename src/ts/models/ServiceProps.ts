interface ServiceProps {
  process:       string;
  changeProcess: (process: string) => void;

  loadSamples:        () => void;
  isLoadedSamples:    boolean;
  setIsLoadedSamples: (flag: boolean) => void;

  isLoadRequest:    boolean;
  setIsLoadRequest: (isLoadRequest: boolean) => void;

  sample10Imgs:       string[][];
  setSample10Imgs:    (sample10Imgs: string[][]) => void;
  sample10Seeds:      number[][];
  setSample10Seeds:   (sample10Seeds: number[][]) => void;
  sample10Weights:    number[][];
  setSample10Weights: (sample10Weights: number[][]) => void;

  selects:          number[];
  setSelects:       (selects: number[]) => void;
  selectedNum:      number;
  setSelectedNum:   (selectedNum: number) => void;
  isSelecting:      boolean[];
  setIsSelecting:   (selecting: boolean[]) => void;

  videoPath:    string;
  setVideoPath: (videoPath: string) => void;

  videoFrame:    number;
  setVideoFrame: (videoFrame: number) => void;
}

export default ServiceProps;