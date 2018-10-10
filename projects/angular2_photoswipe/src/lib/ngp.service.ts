import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgpService {

  LightboxElement:ElementRef;

  constructor() { }
}
