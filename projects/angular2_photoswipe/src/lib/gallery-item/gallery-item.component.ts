import { Component, Input } from '@angular/core';
import { Image } from '../image';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'ngp-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent {

  @Input() image: Image;

  constructor(private galComp: GalleryComponent) {
  }

  public onClick() {
    this.galComp.onClick (this.image);
    return false;
  }

}
