import {Component} from '@angular2/core';
import {Image} from '../model/image.model';
import {Observable} from 'rxjs/Observable';
import {LightboxService} from '../service/lightbox.service';

declare var PhotoSwipe: any;
declare var PhotoSwipeUI_Default: any;

@Component({
  selector: 'lightbox',
  templateUrl: '../lightbox.template.html',
  styleUrls: ['../assets/css/lightbox.style.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Lightbox {

  m_images: Observable<Image[]> = this.lbService.m_images;
  gallery;

  constructor(public lbService:LightboxService) {
  }

  openImage(img : Image) {
    this.openPhotoSwipe(img, document.getElementsByClassName('angular2_photoswipe')[0]);
    return false;
  }

  private openPhotoSwipe(img:Image, galleryDOM:any) {
    var options = {
      galleryUID: galleryDOM.getAttribute('data-pswp-uid'),
      index: img.id
    }

    this.gallery = new PhotoSwipe(document.querySelectorAll('.pswp')[0], PhotoSwipeUI_Default, this.getImages(), options);
    this.gallery.init();
  }

  private getImages() {
    let items = [];
    items.length = 0;

    this.lbService.getImages().forEach(function(img){
      items.push({
        src: img.largeUrl,
        w: 800,
        h: 800
      })
    });
    return items;
  }

  private logImage(img:Image) {
    console.log(img);
  }

}
