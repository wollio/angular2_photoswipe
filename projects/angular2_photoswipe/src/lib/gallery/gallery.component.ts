import { Component, ContentChildren, QueryList, Input } from '@angular/core';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

import { GalleryItemComponent } from '../gallery-item/gallery-item.component';
import { Image } from '../image';
import { NgpService } from '../ngp.service';

@Component({
  selector: 'ngp-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  @ContentChildren(GalleryItemComponent) galleryItems: QueryList<GalleryItemComponent>;

  @Input() id: String = 'sampleId';

  constructor(private ngp: NgpService) {}

  onClick(data: Image) {
    this.openPhotoSwipe(data);
  }

  private openPhotoSwipe(img: Image): boolean {
    const options: PhotoSwipe.Options = { };

    options.addCaptionHTMLFn = function(item, captionEl, isFake) {
          if (!item.title) {
              captionEl.children[0].innerHTML = '';
              return false;
          }
          captionEl.children[0].innerHTML = item.title;
          return true;
      };

      options.shareButtons = [
        // {id:'context', label:'Nabídka', url:'zobrazMenuPro (\'{{text}}\')', onclick:true},
        {id: 'download', label: 'Stáhnout', url: '{{raw_image_url}}', download: true}
         ];

      options.loop = true;
         // nasleduji vlastnosti pro minimal
      options.mainClass = 'pswp--minimal--dark';
      options.barsSize = {top: 0, bottom: 0};
      options.captionEl = false;
      options.fullscreenEl = false;
         // shareEl: false,
      options.bgOpacity = 0.85;
      options.tapToClose = true;
      options.tapToToggleControls = false;


    options.galleryUID = this.id; 
    const imageData = this.getImagesAsPhotoswipe();
    options.index = img.index;
    const PSWP: HTMLElement = <HTMLElement> this.ngp.LightboxElement.nativeElement;
    new PhotoSwipe(PSWP, PhotoSwipeUI_Default, imageData, options).init();
    return false;
  }

  private getImagesAsPhotoswipe(): any[] {
    const items: any[] = [];
    let index = 0;

    this.galleryItems.toArray().forEach(cp => {
      const image = cp.image;
      image.index = index++;
      items.push({
          src: image.largeUrl,
          w: image.width,
          h: image.height,
          pid: image.pid,
          title: image.description,
          author: image.author
      });
    });
    return items;
  }

}
