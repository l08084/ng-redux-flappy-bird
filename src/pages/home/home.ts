import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FlappyBirdActions } from '../../state/action';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  subScription: Subscription;

  @ViewChild('bird') bird: ElementRef;

  @select() readonly maxY$: Observable<number>;
  @select() readonly birdPosition$: Observable<any>;
  @select() readonly isEnd$: Observable<boolean>;

  constructor(private action: FlappyBirdActions) {}

  ngAfterViewInit() {
    this.init();
    Observable
      .fromEvent(document, 'click')
      .subscribe(_ => this.action.fly());
    this.isEnd$
      .filter(value => value)
      .subscribe(_ => this.end());
  }

  init = (): void => {
    const maxY: number
      = window.innerHeight - this.bird.nativeElement.height;
    this.action.setMaxY(maxY);
    this.action.setAy(0.4);
    this.action.setVy(0);
    this.action.setY(0);
    this.start();
  }

  start = (): void => {
    this.subScription = Observable.interval(20)
      .subscribe(() => this.action.moveBird());
  }

  end = (): void => {
    if (this.subScription) {
      this.subScription.unsubscribe();
    }
  }

}
