import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { dispatch } from '@angular-redux/store';

export type NumberAction = FluxStandardAction<number, void>;

@Injectable()
export class FlappyBirdActions {
  static SET_MAX_Y = 'SET_MAX_Y';

  @dispatch() setMaxY = (maxY: number): NumberAction => ({
    type: FlappyBirdActions.SET_MAX_Y,
    payload: maxY,
    meta: undefined
  })

}
