import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './src/service/lightbox.service';
export * from './src/component/lightbox.component';
export * from './src/model/image.model';

import { Lightbox } from './src/component/lightbox.component';
import { LightboxService } from './src/service/lightbox.service';

export let providers = [LightboxService];

@NgModule({
  imports: [ CommonModule ],
  declarations: [ Lightbox ],
  providers: [ LightboxService ],
  exports: [ Lightbox ]
})
export class Angular2PhotoswipeModule {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: Angular2PhotoswipeModule,
            providers: providers
        };
    }
}
