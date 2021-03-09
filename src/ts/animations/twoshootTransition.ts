const twoshootTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translate(0, 150%)",
    opactiy: "0"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translate(0, 0)",
    opactiy: "1"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translate(0, 150%)",
    opactiy: "0"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translate(0, 150%)",
    opactiy: "0"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translate(0, 150%)",
    opactiy: "0"
  }
};

export default twoshootTransitionStyle;