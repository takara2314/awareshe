export const forwardTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translateX(1500px)"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translateX(0px)"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translateX(-1500px)"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translateX(-1500px)"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translateX(1500px)"
  }
};

export const backwardTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translateX(-1500px)"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translateX(0px)"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translateX(1500px)"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translateX(1500px)"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translateX(-1500px)"
  }
};