# PhotoSwipe for Angular 2+

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/03307ee37f9b4247b33602ab113b6bc9)](https://app.codacy.com/app/wollio/angular2_photoswipe?utm_source=github.com&utm_medium=referral&utm_content=wollio/angular2_photoswipe&utm_campaign=Badge_Grade_Dashboard)
[![npm version](https://badge.fury.io/js/angular2_photoswipe.svg)](https://badge.fury.io/js/angular2_photoswipe)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 
version 6.2.4.

This is a library with components and services for PhotoSwipe. 
The official PhotoSwipe JS file is still needed.

This library supports SSR. (Tested with [Angular Universal Starter](https://github.com/angular/universal-starter))

## Installation
##### Install NPM packages
```bash
npm install --save photoswipe
npm install --save angular2_photoswipe
```

##### Add assets in your angular.json
```json
"projects": {
  "your-app-name": {
    "architect": {
      "build": {
        "assets": [
          // add this from here
          { 
            "glob": "**/*.@(svg|png|gif)", 
            "input": "./node_modules/photoswipe/src/css/default-skin", 
            "output": "/assets/media" 
          }
          // to here        
        ]    
      }
    }
  }
}
```

##### Include the Angular2PhotoswipeModule.
```typescript
import {Angular2PhotoswipeModule} from 'angular2_photoswipe';
 
@NgModule({
  ...
  imports: [
    BrowserModule,
    Angular2PhotoswipeModule
  ]
  ...
})
export class AppModule {
  ...
}
```

##### HTML

Place the `npg-lightbox` somewhere in your layout.

```html
<ngp-lightbox></ngp-lightbox>
```

Add the `ngp-gallery` and the `ngp-gallery-item` in your component html. 

```html
<ngp-gallery [galleryId]="sampleId">
  <ngp-gallery-item [image]="image1"></ngp-gallery-item>
  <ngp-gallery-item [image]="image2"></ngp-gallery-item>
</ngp-gallery>
```

##### Load images in component

```typescript
import { Image } from 'angular2_photoswipe';

// instantiate images like this
this.image1 = new Image();
this.image1.largeUrl = 'https://picsum.photos/4934/3296/?image=1';
this.image1.height = 3296;
this.image1.width = 4934;
this.image1.id = 0;
this.image1.size = `${this.image1.width}x${this.image1.height}`;
this.image1.thumbUrl = 'https://picsum.photos/300/200/?image=1'; 
```

##### Custom Options Adapter
```typescript
import {Angular2PhotoswipeModule, LightboxAdapter} from 'angular2_photoswipe';
 
@NgModule({
  imports: [
    BrowserModule,
    Angular2PhotoswipeModule,
  ],
  //Custom LightboxAdapter
  providers: [
    {provide : LightboxAdapter, useClass : CustomLightboxAdapter}
  ]
})
export class AppModule {
}
```

```typescript 
import { Injectable } from '@angular/core';
import { LightboxAdapter } from 'angular2_photoswipe';

@Injectable()
export class CustomLightboxAdapter extends LightboxAdapter {
    allowPanToNext = true;
    spacing = 0.12;
    bgOpacity = 0.4;
    mouseUsed = false;
    loop = true;
    pinchToClose = true;
    closeOnScroll = true;
    closeOnVerticalDrag = true;
    hideAnimationDuration = 333;
    showAnimationDuration = 333;
    showHideOpacity = false;
    escKey = true;
    arrowKeys = true;
    getPageURLForShare = function(shareButtonData) {
        return window.location.href;
    };
}
```

##### Bootstrap 4 support
```typescript 
import { Injectable } from '@angular/core';
import { LightboxAdapter } from 'angular2_photoswipe';

@Injectable()
export class CustomLightboxAdapter extends LightboxAdapter {
       enableBootstrap4 = true;
}
```

###### configure card count
```scss 
.card-columns {
  @include media-breakpoint-only(lg) {
    column-count: 4;
  }
  @include media-breakpoint-only(xl) {
    column-count: 5;
  }
}
```


## Demo

This repository contains a demo app. the source is located in: `src/`

Run `ng serve` to start the dev server for the demo. 
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## angular2_photoswipe

The library was created with the angular cli using `ng generate library`.

**!!! The project's name is 'angular2-photoswipe' (with a dash) because an underline
is not supported.**

### build library

To build the library run `npm run build_lib`.
