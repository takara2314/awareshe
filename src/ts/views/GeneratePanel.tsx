import React from 'react';
import Top from '../components/Top';
import Select10 from '../components/Select10';
import WaitVideo from '../components/WaitVideo';
import Select30 from '../components/Select30';
import Result from '../components/Result';
import ServiceProps from '../models/ServiceProps';
import { Transition, TransitionStatus } from 'react-transition-group';
import { forwardTransitionStyle, backwardTransitionStyle } from '../animations/transitionStyle';

const GeneratePanel = (props: ServiceProps) => {
  return (
    <>
      {props.process == 'none'
        ? <Top {...props} />
        : <></>
      }

      <Transition
        in={props.process === 'select10'}
        timeout={{enter: 100, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={props.processForward
              ? forwardTransitionStyle[state]
              : backwardTransitionStyle[state]
            }
            className="w-full h-full absolute flex flex-col justify-center"
          >
            <Select10 {...props} />
          </div>
        }
      </Transition>

      <Transition
        in={props.process == 'waitvideo'}
        timeout={{enter: 100, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={props.processForward
              ? forwardTransitionStyle[state]
              : backwardTransitionStyle[state]
            }
            className="w-full h-full absolute flex flex-col justify-center"
          >
            <WaitVideo {...props} />
          </div>
        }
      </Transition>

      <Transition
        in={props.process == 'select30'}
        timeout={{enter: 100, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={props.processForward
              ? forwardTransitionStyle[state]
              : backwardTransitionStyle[state]
            }
            className="w-full h-full absolute flex flex-col justify-center"
          >
            <Select30 {...props} />
          </div>
        }
      </Transition>

      <Transition
        in={props.process == 'result'}
        timeout={{enter: 100, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={props.processForward
              ? forwardTransitionStyle[state]
              : backwardTransitionStyle[state]
            }
            className="w-full h-full absolute flex flex-col justify-center"
          >
            <Result {...props} />
          </div>
        }
      </Transition>
    </>
  );
}

export default GeneratePanel;