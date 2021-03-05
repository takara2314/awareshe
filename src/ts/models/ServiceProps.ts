interface ServiceProps {
  process:       string;
  changeProcess: (process: string) => void;

  loadSamples:        () => void;
  isLoadedSamples:    boolean;
  setIsLoadedSamples: (flag: boolean) => void;

  isLoadRequest:    boolean;
  setIsLoadRequest: (isLoadRequest: boolean) => void;

  select10Imgs:       string[][];
  setSelect10Imgs:    (select10Imgs: string[][]) => void;
  select10Seeds:      number[][];
  setSelect10Seeds:   (select10Seeds: number[][]) => void;
  select10Weights:    number[][];
  setSelect10Weights: (select10Weights: number[][]) => void;

  selects:          number[];
  setSelects:       (selects: number[]) => void;
  selectedNum:      number;
  setSelectedNum:   (selectedNum: number) => void;
  isSelecting:      boolean[];
  setIsSelecting:   (selecting: boolean[]) => void;

  videoFrame:    number;
  setVideoFrame: (videoFrame: number) => void;
}

export default ServiceProps;