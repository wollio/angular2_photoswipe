import {Injectable} from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import {Image} from '../model/image.model';

@Injectable()
export class LightboxService {

  m_images: Observable<Image[]>;
  private m_imagesObserver: Observer<Image[]>;
  private m_imagesData : Image[];

  constructor() {
    this.m_images = new Observable(observer => this.m_imagesObserver = observer).share();
  }

  public setImages(images:Image[]) {
    this.m_imagesData = images;
    this.refresh();
  }

  public addImage(image:Image) {
    this.m_imagesData.push(image);
    this.refresh();
  }

  public getImages() : Image[] {
    return this.m_imagesData;
  }

  public removeImage(id:number) {
    this.m_imagesData.forEach((img, index) => {
        if (img.id === id) { this.m_imagesData.splice(index, 1); }
    });
    this.refresh();
  }

  private refresh() {
    this.m_imagesObserver.next(this.m_imagesData);
  }

}
