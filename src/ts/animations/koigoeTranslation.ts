export const koigoeTransitionStyle: {entering: any, entered: any, exiting: any, exited: any, unmounted: any} = {
  entering: {
    transition: "all 1s ease",
    transform: "translate(0, 0)",
    opacity: "0"
  },
  entered: {
    transition: "all 1s ease",
    transform: "translate(0, -100%)",
    opacity: "1"
  },
  exiting: {
    transition: "all 1s ease",
    transform: "translate(0, -200%)",
    opacity: "0"
  },
  exited: {
    transition: "all 1s ease",
    transform: "translate(0, -200%)",
    opacity: "0"
  },
  unmounted: {
    transition: "all 1s ease",
    transform: "translate(0, 0)",
    opacity: "0"
  }
};