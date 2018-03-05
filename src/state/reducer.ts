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
      };
    default:
      return lastState;
  }
}
