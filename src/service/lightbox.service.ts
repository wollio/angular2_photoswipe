import { Injectable } from '@angular/core';
import {Image} from '../model/image.model';

@Injectable()
export class LightboxService {

  gallery:{ [key:string]:Image[] } = {};

  constructor() {

  }

  public createGallery(key:string) {
    this.gallery[key] = [];
  }

  public setImages(key:string, images:Image[]) {
    this.gallery[key] = images;
  }

  public addImage(key:string, image:Image) {
    if (key in this.gallery ) {
      this.gallery[key].push(image);
    } else {
      throw new Error(`gallery '${key}' does not exist`);
    }
  }

  public getImages(key:string): Image[] {
    return this.gallery[key];
  }

  public removeImage(key:string, id:number) {
    this.gallery[key].forEach((img, index) => {
        if (img.id === id) { this.gallery[key].splice(index, 1); }
    });
  }

}
