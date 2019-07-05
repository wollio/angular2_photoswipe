import { LightboxOptions, LightboxMethods, ShareButton, CustomOptions } from './lightbox-options';
import { Injectable } from '@angular/core';

export function ANGULAR2_PHOTO_SWIPE_FACTORY() {
    return new DefaultLightboxAdapter();
}

@Injectable({ providedIn: 'root', useFactory: ANGULAR2_PHOTO_SWIPE_FACTORY })
export abstract class LightboxAdapter implements LightboxOptions, LightboxMethods, CustomOptions {
    getThumbBoundsFn: Function;
    getDoubleTapZoom: Function;
    isClickableElement: Function;
    addCaptionHTMLFn: Function;

    index: number;
    showHideOpacity: boolean;
    showAnimationDuration: number;
    hideAnimationDuration: number;
    bgOpacity: number;
    spacing: number;
    allowPanToNext: boolean;
    maxSpreadZoom: number;
    loop: boolean;
    pinchToClose: boolean;
    closeOnScroll: boolean;
    closeOnVerticalDrag: boolean;
    mouseUsed: boolean;
    escKey: boolean;
    arrowKeys: boolean;
    history: boolean;
    galleryUID: number;
    galleryPIDs: boolean;
    errorMsg: string;
    barsSize: Object;
    timeToIdle: number;
    timeToIdleOutside: number;
    loadingIndicatorDelay: number;
    closeEl: boolean;
    captionEl: boolean;
    fullscreenEl: boolean;
    zoomEl: boolean;
    shareEl: boolean;
    counterEl: boolean;
    arrowEl: boolean;
    preloaderEl: boolean;
    tapToClose: boolean;
    tapToToggleControls: boolean;
    clickToCloseNonZoomable: boolean;
    closeElClasses: string[];
    indexIndicatorSep: string;
    shareButtons: ShareButton[];
    enableBootstrap4: boolean;
}

@Injectable()
export class DefaultLightboxAdapter extends LightboxAdapter {
    allowPanToNext = true;
    spacing = 0.12;
    bgOpacity = 1.0;
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
    enableBootstrap4: false;
}
