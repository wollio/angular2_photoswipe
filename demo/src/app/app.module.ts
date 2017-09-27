import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

//for you
//import {LightboxService, Angular2PhotoswipeModule} from 'angular2_photoswipe';
import {LightboxService, Angular2PhotoswipeModule} from '../../../index';
import {AppComponent} from "./app.component";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2PhotoswipeModule.forRoot()
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {

  }

}
