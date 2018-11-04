import { Component, ContentChildren, AfterContentInit, QueryList, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class GalleryComponent implements AfterContentInit {

  @ViewChild('ngpGallery') galleryElement: ElementRef;
  @ContentChildren(GalleryItemComponent) galleryItems: QueryList<GalleryItemComponent>;

  @Input() id: String = 'sampleId';

  images: Image[];

  constructor(private ngp: NgpService) {
    this.images = [];
  }

  ngAfterContentInit() {
    this.galleryItems.toArray().forEach(cp => {
      this.images.push(cp.image);

      // listen for clicks;
      cp.clicked.subscribe((data) => {
        this.onClick(data);
      });
    });
  }

  onClick(data: Image) {
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
    options.galleryUID = this.id; // galleryDOM.nativeElement.getAttribute('data-pswp-uid');
    const imageData = this.getImagesAsPhotoswipe();
    options.index = img.index;
    const PSWP: HTMLElement = <HTMLElement> this.ngp.LightboxElement.nativeElement;
    new PhotoSwipe(PSWP, PhotoSwipeUI_Default, imageData, options).init();
    return false;
  }

  private getImagesAsPhotoswipe(): any[] {
    const items: any[] = [];
    let index = 0;
    this.images.forEach(image => {
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
