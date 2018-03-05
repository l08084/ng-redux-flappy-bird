import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  @ViewChild('bird') bird: ElementRef;
  maxY: number;

  constructor(public navCtrl: NavController) {}

  ngAfterViewInit() {
    const height = this.bird.nativeElement.offsetHeight;
    const width = this.bird.nativeElement.offsetWidth;
    // ViewChildで取得した要素のサイズを表示する
    console.log(`height: ${height}`);
    console.log(`width: ${width}`);
  }

  init = (): void => {
    this.maxY = window.innerHeight - this.bird.nativeElement.height;
  }

}
