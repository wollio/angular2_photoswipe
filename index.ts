'use strict';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './src/service/lightbox.service';
export * from './src/component/lightbox.component';
export * from './src/model/image.model';

import { Lightbox } from './src/component/lightbox.component';
import { LightboxService } from './src/service/lightbox.service';

window['PhotoSwipe'] = require('photoswipe');
import PhotoSwipeUI_Default from 'photoswipe';
window['PhotoSwipeUI_Default'] = PhotoSwipeUI_Default;

export default {
  providers : [LightboxService],
  directives: [Lightbox]
};

@NgModule({
  imports: [ CommonModule ],
  declarations: [ Lightbox ],
  providers: [ LightboxService ],
  exports: [ Lightbox ]
})
export class Angular2Photoswipe {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: Angular2Photoswipe,
            providers: [LightboxService]
        };
    }
}
