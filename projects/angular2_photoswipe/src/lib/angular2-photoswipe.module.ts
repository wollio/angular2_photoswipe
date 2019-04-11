import { NgModule, InjectionToken } from '@angular/core';
import { Angular2PhotoswipeComponent } from './angular2-photoswipe.component';
import { LightboxComponent } from './lightbox/lightbox.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
export { LightboxAdapter } from './lightbox-adapter';

@NgModule({
  declarations: [Angular2PhotoswipeComponent, LightboxComponent, GalleryComponent, GalleryItemComponent],
  exports: [LightboxComponent, GalleryComponent, GalleryItemComponent]
})
export class Angular2PhotoswipeModule {
ss
}
