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

  @Input() options: PhotoSwipe.Options = null;

  constructor(private ngp: NgpService) {}

  onClick(data: Image) {
    this.openPhotoSwipe(data);
  }

  private openPhotoSwipe(img: Image): boolean {
    const opt: PhotoSwipe.Options = null == this.options ? {} : this.options;

    opt.addCaptionHTMLFn = function(item, captionEl, isFake) {
          if (!item.title) {
              captionEl.children[0].innerHTML = '';
              return false;
          }
          captionEl.children[0].innerHTML = item.title;
          return true;
      };

    opt.galleryUID = this.id;

    const imageData = this.getImagesAsPhotoswipe();
    opt.index = img.index;
    const PSWP: HTMLElement = <HTMLElement> this.ngp.LightboxElement.nativeElement;
    new PhotoSwipe(PSWP, PhotoSwipeUI_Default, imageData, opt).init();
    return false;
  }

  private getImagesAsPhotoswipe(): any[] {
    const items: any[] = [];
    let index = 0;

    this.galleryItems.toArray().forEach(cp => {
      const image = cp.image;
      image.index = index++;

      const img: any  = {
        w: image.width,
        h: image.height,
        pid: image.pid,
        title: image.description,
        author: image.author
      };

      if (null == image.html) {
        img.src = image.largeUrl;
      } else {
        img.html = image.html;
      }

      items.push(img);

    });

    console.log (items);

    return items;
  }

}
