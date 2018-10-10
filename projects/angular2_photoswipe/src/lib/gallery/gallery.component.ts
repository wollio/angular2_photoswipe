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

  @ViewChild('ngpGallery') galleryElement:ElementRef;
  @ContentChildren(GalleryItemComponent) galleryItems:QueryList<GalleryItemComponent>
  
  id:string = 'sampleId';

  images:Image[];

  constructor(private ngp:NgpService) {
    this.images = [];
  }

  ngAfterContentInit() {
    this.galleryItems.toArray().forEach(cp => {
      this.images.push(cp.image);

      //listen for clicks;
      cp.clicked.subscribe((data) => {
        this.onClick(data);
      })
    });
  }

  onClick(data) {
    this.openPhotoSwipe(data, this.galleryElement);
  }

  private openPhotoSwipe(img:Image, galleryDOM:ElementRef):boolean {
    let options:PhotoSwipe.Options = {};
    options.galleryUID = galleryDOM.nativeElement.getAttribute('data-pswp-uid');
    options.index = img.id;
    const PSWP:HTMLElement = <HTMLElement> this.ngp.LightboxElement.nativeElement;
    new PhotoSwipe(PSWP, PhotoSwipeUI_Default, this.getImagesAsPhotoswipe(), options).init();
    return false;
  }

  private getImagesAsPhotoswipe():any[] {
    let items:any[] = [];
    this.images.forEach(image => {
      items.push({src: image.largeUrl, w: image.width, h: image.height})
    });
    return items;
  }

}