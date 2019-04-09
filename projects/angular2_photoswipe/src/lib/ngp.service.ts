import { Injectable, ElementRef, Inject } from '@angular/core';
import { LightboxToken } from './default-lightbox-options';
import { LIGHTBOX_TOKEN } from './angular2-photoswipe.module';

@Injectable({
  providedIn: 'root'
})
export class NgpService {

  LightboxElement: ElementRef;

  constructor(@Inject(LIGHTBOX_TOKEN) readonly options: LightboxToken) {

  }

  getOptions() {
    return this.options;
  }
}
