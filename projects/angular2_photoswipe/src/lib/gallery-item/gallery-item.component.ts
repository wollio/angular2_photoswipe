import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../image';

@Component({
  selector: 'ngp-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent {

  @Input('image') image: Image;
  @Output() clicked = new EventEmitter<Image>();

  constructor() {
  }

  public onClick() {
    this.clicked.emit(this.image);
    return false;
  }

}
