import { Injectable } from '@angular/core';
import { FlappyBirdActions } from '../state/action';

@Injectable()
export class GameService {
  constructor(private action: FlappyBirdActions) {}
}
