import { Component, ContentChildren, AfterContentInit, QueryList, ViewChild, ElementRef, OnDestroy, Inject } from '@angular/core';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

import { GalleryItemComponent } from '../gallery-item/gallery-item.component';
import { Image } from '../image';
import { NgpService } from '../ngp.service';
import { Subscription } from 'rxjs';

import { LightboxOptions } from '../lightbox-options';
import { LightboxAdapter } from '../lightbox-adapter';

@Component({
  selector: 'ngp-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterContentInit, OnDestroy {

  @ViewChild('ngpGallery') galleryElement: ElementRef;
  @ContentChildren(GalleryItemComponent) galleryItems: QueryList<GalleryItemComponent>

  id: String = 'sampleId';
  subscriptions: Subscription[] = [];
  isBootstrapEnabled: boolean;

  images: Image[];

  constructor(private ngp: NgpService, private adapter: LightboxAdapter) {
    this.images = [];
    this.isBootstrapEnabled = this.adapter.enableBootstrap4;
  }

  ngAfterContentInit() {
    this.images = <any>this.galleryItems.toArray().map(cp => {
      // listen for clicks;
      this.subscriptions.push(cp.clicked.subscribe((data) => this.onClick(data)));
      return cp.image;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onClick(data) {
    this.openPhotoSwipe(data, this.galleryElement);
  }

  private openPhotoSwipe(img: Image, galleryDOM: ElementRef): boolean {
    this.adapter.galleryUID = galleryDOM.nativeElement.getAttribute('data-pswp-uid');
    this.adapter.index = img.id;
    const PSWP: HTMLElement = <HTMLElement>this.ngp.LightboxElement.nativeElement;
    new PhotoSwipe(PSWP, PhotoSwipeUI_Default, this.getImagesAsPhotoswipe(), this.adapter).init();
    return false;
  }

  private getImagesAsPhotoswipe(): any[] {
    return this.images.map(image => {
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
