import { Component, ContentChildren, AfterContentInit, QueryList, ViewChild, ElementRef } from '@angular/core';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

import { GalleryItemComponent } from '../gallery-item/gallery-item.component';
import { Image } from '../image';
import { NgpService } from '../ngp.service';

@Component({
  selector: 'ngp-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterContentInit {

  @ViewChild('ngpGallery') galleryElement: ElementRef;
  @ContentChildren(GalleryItemComponent) galleryItems: QueryList<GalleryItemComponent>

  id: String = 'sampleId';

  images: Image[];

  constructor(private ngp: NgpService) {
    this.images = [];
  }

  ngAfterContentInit() {
   this.images = this.galleryItems.toArray().map(cp => {
      // listen for clicks;
      cp.clicked.subscribe((data) => {
        this.onClick(data);
      });
    });
  }

  onClick(data) {
    this.openPhotoSwipe(data, this.galleryElement);
  }

  private openPhotoSwipe(img: Image, galleryDOM: ElementRef): boolean {
    const options: PhotoSwipe.Options = {
      addCaptionHTMLFn: function(item, captionEl, isFake) {
          if (!item.title) {
              captionEl.children[0].innerHTML = '';
              return false;
          }
          captionEl.children[0].innerHTML = item.title;
          return true;
      },
    };
    options.galleryUID = galleryDOM.nativeElement.getAttribute('data-pswp-uid');
    options.index = img.id;
    const PSWP: HTMLElement = <HTMLElement> this.ngp.LightboxElement.nativeElement;
    new PhotoSwipe(PSWP, PhotoSwipeUI_Default, this.getImagesAsPhotoswipe(), options).init();
    return false;
  }

  private getImagesAsPhotoswipe(): any[] {
    return this.images.map(image : Image => {
      return {
          src: image.largeUrl,
          w: image.width,
          h: image.height,
          pid: image.id,
          title: image.description,
          author: image.author
       };
    });
  }

}
