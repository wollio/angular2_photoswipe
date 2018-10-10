import { Component, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { NgpService } from '../ngp.service';

@Component({
  selector: 'ngp-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements AfterContentInit {

  @ViewChild('ngpLightbox') el:ElementRef;

  constructor(private ngp:NgpService) {}

  ngAfterContentInit() {
    this.ngp.LightboxElement = this.el;
  }

}
