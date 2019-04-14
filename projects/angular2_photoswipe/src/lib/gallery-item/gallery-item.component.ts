import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Image } from '../image';
import { LightboxAdapter } from '../lightbox-adapter';

@Component({
  selector: 'ngp-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent {

  @Input('image') image: Image;
  @Output() clicked = new EventEmitter<Image>();
  @HostBinding('class.card') isBootstrapEnabled: boolean = false;

  constructor(private adapter: LightboxAdapter) {
    this.isBootstrapEnabled = this.adapter.enableBootstrap4;
  }

  public onClick() {
    this.clicked.emit(this.image);
    return false;
  }

}
