import {Component, Input} from '@angular/core';
import {Image} from '../model/image.model';
import {LightboxService} from '../service/lightbox.service';
import {PhotoswipeImage} from "../model/photoswipe-image.model";

declare let PhotoSwipe: any;
declare let PhotoSwipeUI_Default: any;

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styles: []
})
export class Lightbox {

  @Input('galleryKey') key:string;

  constructor(private lbService:LightboxService) {
  }

  public openImage(img : Image) {
    this.openPhotoSwipe(img, document.getElementsByClassName('angular2_photoswipe')[0]);
    return false;
  }

  public getImages():Image[] {
    return this.lbService.getImages(this.key);
  }

  private openPhotoSwipe(img:Image, galleryDOM:any):boolean {

    let options:PhotoSwipe.Options = {};
    options.galleryUID = galleryDOM.getAttribute('data-pswp-uid');
    options.index = img.id;
    const PSWP:HTMLElement = <HTMLElement> document.querySelectorAll('.pswp')[0];
    new PhotoSwipe(PSWP, PhotoSwipeUI_Default, this.getImagesAsPhotoswipe(), options).init();
    return false;
  }

  private getImagesAsPhotoswipe():PhotoswipeImage[] {
    let items:PhotoswipeImage[] = [];
    items.length = 0;

    this.lbService.getImages(this.key).forEach(function(img){
      items.push(new PhotoswipeImage(img.largeUrl, 800, 800));
    });
    return items;
  }

  private logImage(img:Image) {
    console.log(img);
  }

}
