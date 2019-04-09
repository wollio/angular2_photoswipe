import { NgModule, InjectionToken } from '@angular/core';
import { Angular2PhotoswipeComponent } from './angular2-photoswipe.component';
import { LightboxComponent } from './lightbox/lightbox.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { DefaultLightboxOptions, LIGHTBOX_TOKEN } from './default-lightbox-options';
import { Options } from 'photoswipe';

@NgModule({
  declarations: [Angular2PhotoswipeComponent, LightboxComponent, GalleryComponent, GalleryItemComponent],
  exports: [LightboxComponent, GalleryComponent, GalleryItemComponent]
})
export class Angular2PhotoswipeModule {

  static forRoot(options: Partial<Options>): ModuleWithProviders {
    return {
      ngModule: Angular2PhotoswipeModule, providers: [{
        provide: LIGHTBOX_TOKEN, useValue: {
          default: DefaultLightboxOptions,
          options,
        }
      }]
    };
  }

}
