import { NgModule, InjectionToken } from '@angular/core';
import { Angular2PhotoswipeComponent } from './angular2-photoswipe.component';
import { LightboxComponent } from './lightbox/lightbox.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LightboxOptions } from './lightbox-options';
import { DefaultLightboxOptions, LightboxToken } from './default-lightbox-options';
import { BrowserModule } from '@angular/platform-browser';

export const LIGHTBOX_TOKEN = new InjectionToken<LightboxToken>('LightboxToken')

@NgModule({
  imports: [BrowserModule],
  declarations: [Angular2PhotoswipeComponent, LightboxComponent, GalleryComponent, GalleryItemComponent],
  exports: [LightboxComponent, GalleryComponent, GalleryItemComponent]
})
export class Angular2PhotoswipeModule {

  static forRoot(options: Partial<LightboxOptions>): ModuleWithProviders {
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
