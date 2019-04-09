import { Component, ViewChild, ElementRef, AfterContentInit, Inject } from '@angular/core';
import { NgpService } from '../ngp.service';
import { LightboxToken } from '../default-lightbox-options';

@Component({
  selector: 'ngp-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements AfterContentInit {

  @ViewChild('ngpLightbox') el: ElementRef;
  options: LightboxToken;

  constructor(private ngp: NgpService) { 
   this.options = ngp.getOptions();
  }

  ngAfterContentInit() {
    this.ngp.LightboxElement = this.el;
  }

}
