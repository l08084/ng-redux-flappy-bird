import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FlappyBirdActions } from '../../state/action';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  subScription: Subscription;
  enemySubScription: Subscription;

  @ViewChild('bird') bird: ElementRef;

  @select() readonly maxY$: Observable<number>;
  @select() readonly birdPosition$: Observable<any>;
  @select() readonly isEnd$: Observable<boolean>;

  constructor(private action: FlappyBirdActions,
              private service: GameService,
              private renderer2: Renderer2,
              private el: ElementRef,
            ) {}

  ngAfterViewInit() {
    this.init();
    Observable
      .fromEvent(document, 'click')
      .subscribe(_ => this.action.fly());
    this.isEnd$
      .filter(value => value)
      .subscribe(_ => this.end());
  }

  genEnemy = (): void => {
    const maxX = window.innerWidth;
    const pos = 20 + Math.random() * 60;

    const enemyTop = this.renderer2.createElement('div');
    const enemyBottom = this.renderer2.createElement('div');

    this.renderer2.addClass(enemyTop, 'enemy');
    this.renderer2.addClass(enemyBottom, 'enemy');

    this.renderer2.setStyle(enemyTop, 'bottom', `${pos + 10}%`);
    this.renderer2.setStyle(enemyBottom, 'top', `${(100 - pos) + 10}%`);

    this.renderer2.setStyle(enemyTop, 'left', `${maxX}px`);
    this.renderer2.setStyle(enemyBottom, 'left', `${maxX}px`);

    this.renderer2.appendChild(this.el.nativeElement, enemyTop);
    this.renderer2.appendChild(this.el.nativeElement, enemyBottom);
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
    this.enemySubScription = Observable.interval(2000)
      .subscribe(() => this.genEnemy());
  }

  end = (): void => {
    if (this.subScription) {
      this.subScription.unsubscribe();
    }
    if (this.enemySubScription) {
      this.enemySubScription.unsubscribe();
    }
  }

}
