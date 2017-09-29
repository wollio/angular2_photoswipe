# PhotoSwipe for Angular 2+

This is a library with components and services for PhotoSwipe.
The official PhotoSwipe JS file is still needed.

### installation

```
npm install --save photoswipe
npm install --save angular2_photoswipe
```
Include the Angular2PhotoswipeModule.
```js
import {Angular2PhotoswipeModule} from 'angular2_photoswipe';

@NgModule({
  ...
  imports: [
    BrowserModule,
    Angular2PhotoswipeModule.forRoot()
  ]
  ...
})
export class AppModule {
  ...
}
```

### usage

```js
//create gallery
this.ls.createGallery('galleryKey');

//define images
let img = new Image();
img.largeUrl = '/assets/one.jpg';
img.height = 3296;
img.width = 4934;
img.id = 0;
img.size = `${img.width}x${img.height}`;
img.thumbUrl = '/assets/one.jpg';

//add image to gallery
this.ls.addImage('galleryKey', img);
```

### demo

For a complete integration example have a look in the demo folder.


