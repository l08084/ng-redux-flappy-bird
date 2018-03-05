import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FlappyBirdActions } from '../../state/action';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('bird') bird: ElementRef;

  @select() readonly maxY$: Observable<number>;

  constructor(private action: FlappyBirdActions) {}

  ngAfterViewInit() {
    this.maxY$.subscribe(console.log);
    this.init();
  }

  init = (): void => {
    const maxY: number
      = window.innerHeight - this.bird.nativeElement.height;
    this.action.setMaxY(maxY);
  }

}
