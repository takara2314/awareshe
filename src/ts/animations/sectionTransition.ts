export const forwardTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translate(100%, 0)"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translate(0, 0)"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translate(-100%, 0)"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translate(-100%, 0)"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translate(100%, 0)"
  }
};

export const backwardTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translate(-100%, 0)"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translate(0, 0)"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translate(100%, 0)"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translate(100%, 0)"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translate(-100%, 0)"
  }
};

export const startTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translate(0, 0)"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translate(0, 0)"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translate(-100%, 0)"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translate(-100%, 0)"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translate(100%, 0)"
  }
};

export const twoshotTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translate(0, -150%)"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translate(0, 0)"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translate(0, -150%)"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translate(0, -150%)"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translate(0, -150%)"
  }
};

export const closeTwoshotTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    opacity: "0"
  },
  entered: {
    transition: "all 1s ease",
    opacity: "0.5"
  },
  exiting: {
    transition: "all 1s ease",
    opacity: "0"
  },
  exited: {
    transition: "all 1s ease",
    opacity: "0"
  },
  unmounted: {
    transition: "all 1s ease",
    opacity: "0"
  }
};