import { Component, OnInit } from '@angular/core';
import { Image } from 'angular2_photoswipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular2-photoswipe-demo';
  image1: Image;
  image2: Image;

  constructor() {
  }

  ngOnInit(){
    this.image1 = new Image();
    this.image1.largeUrl = 'https://picsum.photos/4934/3296/?image=1';
    this.image1.height = 3296;
    this.image1.width = 4934;
    this.image1.id = 0;
    this.image1.size = `${this.image1.width}x${this.image1.height}`;
    this.image1.thumbUrl = 'https://picsum.photos/300/200/?image=1';
    this.image1.description = 'hello world';
    this.image1.author = 'David Wollschlegel';

    this.image2 = new Image();
    this.image2.largeUrl = 'https://picsum.photos/4934/3296/?image=0';
    this.image2.height = 3296;
    this.image2.width = 4934;
    this.image2.id = 1;
    this.image2.size = `${this.image2.width}x${this.image2.height}`;
    this.image2.thumbUrl = 'https://picsum.photos/300/200/?image=0';
  }

}
