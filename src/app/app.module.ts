import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ADD this
import { Angular2PhotoswipeModule, LightBoxAdapter } from 'angular2_photoswipe';

import { AppComponent } from './app.component';
import { CustomLightboxAdapter } from './custom-lightbox-adapter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2PhotoswipeModule,
  ],
  // Custom Options providers: [{provide : LightBoxAdapter, useClass : CustomLightboxAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
