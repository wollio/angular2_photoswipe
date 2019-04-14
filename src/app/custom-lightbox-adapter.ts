import { Injectable } from '@angular/core';
import { LightboxAdapter } from 'angular2_photoswipe';

@Injectable()
export class CustomLightboxAdapter extends LightboxAdapter {
    allowPanToNext = true;
    spacing = 0.12;
    bgOpacity = 0.8;
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
    shareEl = true;
    getPageURLForShare = function(shareButtonData) {
        return window.location.href;
    };
}
