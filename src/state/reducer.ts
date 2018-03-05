import { IAppState } from './store';
import { Action } from 'redux';
import { FlappyBirdActions, NumberAction } from './action';

export function rootReducer(
    lastState: IAppState,
    action: Action
): IAppState {
  switch (action.type) {
      case FlappyBirdActions.SET_MAX_Y:
      return {
          maxY: (action as NumberAction).payload,
          ay: lastState.ay,
          vy: lastState.vy,
          y: lastState.y,
          birdPosition: lastState.birdPosition,
          isEnd: lastState.isEnd,
        };
      case FlappyBirdActions.SET_AY:
      return {
          maxY: lastState.maxY,
          ay: (action as NumberAction).payload,
          vy: lastState.vy,
          y: lastState.y,
          birdPosition: lastState.birdPosition,
          isEnd: lastState.isEnd,
        };
      case FlappyBirdActions.SET_VY:
      return {
          maxY: lastState.maxY,
          ay: lastState.ay,
          vy: (action as NumberAction).payload,
          y: lastState.y,
          birdPosition: lastState.birdPosition,
          isEnd: lastState.isEnd,
        };
      case FlappyBirdActions.SET_Y:
      return {
          maxY: lastState.maxY,
          ay: lastState.ay,
          vy: lastState.vy,
          y: (action as NumberAction).payload,
          birdPosition: {top: `${(action as NumberAction).payload}px`},
          isEnd: lastState.isEnd,
        };
      case FlappyBirdActions.MOVE_BIRD:
      const newVy = lastState.vy + lastState.ay;
      let newY = lastState.y + newVy;
      if (newY < 0) {
        newY = 0;
      }
      return {
          maxY: lastState.maxY,
          ay: lastState.ay,
          vy: lastState.vy,
          y: (action as NumberAction).payload,
          birdPosition: {top: `${(action as NumberAction).payload}px`},
          isEnd: lastState.isEnd,
        };
    default:
      return lastState;
  }
}
