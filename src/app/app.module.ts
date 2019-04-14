import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ADD this
import { Angular2PhotoswipeModule, LightboxAdapter} from 'angular2_photoswipe';

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
  bootstrap: [AppComponent]
})
export class AppModule { }
