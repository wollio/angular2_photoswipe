import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Image} from '../model/image.model';
import {LightboxService} from '../service/lightbox.service';
import {PhotoswipeImage} from "../model/photoswipe-image.model";

declare let PhotoSwipe: any;
declare let PhotoSwipeUI_Default: any;

@Component({
  selector: 'lightbox',
  template: `<div class="angular2_photoswipe" itemscope itemtype="http://schema.org/ImageGallery">
      <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" *ngFor="let image of getImages()">
          <a href="{{image.largeUrl}}" itemprop="contentUrl" [attr.data-size]="image.width + 'x' + image.height" (click)="openImage(image)">
              <img src="{{image.thumbUrl}}" itemprop="thumbnail" alt="{{image.description}}" />
          </a>
          <figcaption itemprop="caption description">{{image.description}}</figcaption>
      </figure>
  </div>

  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
             It's a separate element, as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>
      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
          <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
          <!-- don't modify these 3 pswp__item elements, data is added later on. -->
          <div class="pswp__container">
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
          </div>
          <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
          <div class="pswp__ui pswp__ui--hidden">
              <div class="pswp__top-bar">
                  <!--  Controls are self-explanatory. Order can be changed. -->
                  <div class="pswp__counter"></div>
                  <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                  <button class="pswp__button pswp__button--share" title="Share"></button>
                  <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                  <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                  <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                  <!-- element will get class pswp__preloader--active when preloader is running -->
                  <div class="pswp__preloader">
                      <div class="pswp__preloader__icn">
                          <div class="pswp__preloader__cut">
                              <div class="pswp__preloader__donut"></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div class="pswp__share-tooltip"></div>
              </div>
              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
              </button>
              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
              </button>
              <div class="pswp__caption">
                  <div class="pswp__caption__center"></div>
              </div>
          </div>
      </div>
  </div>`,
  encapsulation: ViewEncapsulation.None
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
      items.push(new PhotoswipeImage(img.largeUrl, img.width, img.height));
    });
    return items;
  }

  private logImage(img:Image) {
    console.log(img);
  }

}
