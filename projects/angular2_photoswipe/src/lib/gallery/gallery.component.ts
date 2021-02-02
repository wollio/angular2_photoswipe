import {
  Component,
  ContentChildren,
  AfterContentInit,
  QueryList,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Input,
  Output,
  HostListener
} from '@angular/core';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

import { GalleryItemComponent } from '../gallery-item/gallery-item.component';
import { Image } from '../image';
import { NgpService } from '../ngp.service';
import { Subscription } from 'rxjs';

import { LightboxAdapter } from '../lightbox-adapter';
import {debounce, Dimension} from './gallery.util';

@Component({
  selector: 'a2p-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterContentInit, OnDestroy {

  @ViewChild('ngpGallery', { static: true }) galleryElement: ElementRef<HTMLDivElement>;
  @ContentChildren(GalleryItemComponent) galleryItems: QueryList<GalleryItemComponent>;
  @Input() galleryId: string;
  @Input() autoFill = false;
  @Output() shareLinkClick: EventEmitter<{ e: Event, target: HTMLElement }> = new EventEmitter();
  private innerWidth: number;
  private innerHeight: number;

  subscriptions: Subscription[] = [];
  isBootstrapEnabled: boolean;
  pswp: PhotoSwipe<any>;

  images: Image[];

  constructor(private ngp: NgpService, private adapter: LightboxAdapter) {
    this.images = [];
    this.isBootstrapEnabled = this.adapter.enableBootstrap4;
  }

  ngAfterContentInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
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

  @HostListener('window:resize')
  @debounce()
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  private openPhotoSwipe(img: Image, galleryDOM: ElementRef): boolean {
    this.adapter.galleryUID = galleryDOM.nativeElement.getAttribute('data-pswp-uid');
    this.adapter.index = img.id;
    const PSWP: HTMLElement = <HTMLElement>this.ngp.LightboxElement.nativeElement;
    this.pswp = new PhotoSwipe(PSWP, PhotoSwipeUI_Default, this.getImagesAsPhotoswipe(), this.adapter);
    const _this = this;
    this.pswp.listen('shareLinkClick', function (e, target) {
      _this.shareLinkClick.emit({ e, target });
    });
    this.pswp.init();
    return false;
  }

  // If image is landscape or square, set width to window width and height to width * ratio
  // If image is portrait, set height to window height and width to height / ratio
  private getImageDimensions(w: number, h: number): Dimension {
    const ratio = h / w;
    if (w >= h) {
      return {
        width : this.innerWidth,
        height: this.innerWidth * ratio
      };
    } else {
      return {
        width : this.innerHeight / ratio,
        height: this.innerHeight
      };
    }
  }

  private getImagesAsPhotoswipe(): any[] {
    return this.images.map(image => {
      const imgDimensions = this.autoFill ? this.getImageDimensions(image.width, image.height) : {width: image.width, height: image.height};
      return {
        src: image.largeUrl,
        w: imgDimensions.width,
        h: imgDimensions.height,
        pid: image.id,
        title: image.description,
        author: image.author
      };
    });

  }
}
