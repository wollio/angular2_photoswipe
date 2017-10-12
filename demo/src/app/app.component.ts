import {Component, OnInit} from '@angular/core';
import {LightboxService} from "../../../src/service/lightbox.service";
import {Image} from "../../../src/model/image.model";

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  galleryKey:string;

  constructor(private ls:LightboxService) {

  }

  ngOnInit() {
      this.ls.createGallery('galleryKey');
      let img = new Image();
      img.largeUrl = '/assets/one.jpg';
      img.height = 3296;
      img.width = 4934;
      img.id = 0;
      img.size = `${img.width}x${img.height}`;
      img.thumbUrl = '/assets/one.jpg';
      this.ls.addImage('galleryKey', img);

      let img2 = new Image();
      img2.largeUrl = '/assets/two.jpg';
      img2.height = 3296;
      img2.width = 4934;
      img2.id = 0;
      img2.size = `${img.width}x${img.height}`;
      img2.thumbUrl = '/assets/two.jpg';
      this.ls.addImage('galleryKey', img2);

      setTimeout(() => {
          this.galleryKey = 'galleryKey';
      }, 2000);
  }

  imagesLoaded(event:any) {
      console.log(event);
  }
}
