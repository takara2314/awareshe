import React from 'react';
import Top from '../components/Top';
import Select10 from '../components/Select10';
import WaitVideo from '../components/WaitVideo';
import Select30 from '../components/Select30';
import Result from '../components/Result';
import ServiceProps from '../models/ServiceProps';
import { Transition, TransitionStatus } from 'react-transition-group';
import { forwardTransitionStyle, backwardTransitionStyle, startTransitionStyle } from '../animations/sectionTransition';

const GeneratePanel = (props: ServiceProps) => {
  return (
    <>
      {props.process == 'none'
        ? <Top {...props} />
        : <></>
      }

      {['select10', 'waitvideo', 'select30', 'result'].includes(props.process)
        ? <section
            className="flex flex-row justify-between w-72 mx-auto select-none fixed top-12 inset-x-0"
          >
            <h1 className={
              props.process === 'select10'
              ? "text-6xl font-bold text-white"
              : "text-6xl font-bold text-red-900"
            }>
              1
            </h1>
            <h1 className={
              props.process === 'waitvideo'
              ? "text-6xl font-bold text-white"
              : "text-6xl font-bold text-red-900"
            }>
              2
            </h1>
            <h1 className={
              props.process === 'select30'
              ? "text-6xl font-bold text-white"
              : "text-6xl font-bold text-red-900"
            }>
              3
            </h1>
            <h1 className={
              props.process === 'result'
              ? "text-6xl font-bold text-white"
              : "text-6xl font-bold text-red-900"
            }>
              4
            </h1>
          </section>
        : <></>
      }

      <Transition
        in={props.process === 'select10'}
        timeout={{enter: 0, exit: 1000}}
        mountOnEnter unmountOnExit
      >
        {(state: TransitionStatus) =>
          <div
            style={props.processForward
              ? startTransitionStyle[state]
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
        timeout={{enter: 0, exit: 1000}}
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
        timeout={{enter: 0, exit: 1000}}
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
        timeout={{enter: 0, exit: 1000}}
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