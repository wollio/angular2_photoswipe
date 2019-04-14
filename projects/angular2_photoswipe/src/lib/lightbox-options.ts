export interface LightboxOptions {
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

    mouseUsed: boolean

    escKey: boolean

    arrowKeys: boolean;
    history: boolean

    galleryUID: number
    galleryPIDs: boolean;


    errorMsg: string;

    // Size of top & bottom bars in pixels,
    // "bottom" parameter can be 'auto' (will calculate height of caption)
    // option applies only when mouse is used, 
    // or width of screen is more than 1200px
    // 
    // (Also refer to `parseVerticalMargin` event)
    barsSize: Object;

    // Adds class pswp__ui--idle to pswp__ui element when mouse isn't moving for 4000ms
    timeToIdle: number;

    // Same as above, but this timer applies when mouse leaves the window
    timeToIdleOutside: number;

    // Delay until loading indicator is displayed
    loadingIndicatorDelay: number;

    // Buttons/elements
    closeEl: boolean;
    captionEl: boolean;
    fullscreenEl: boolean;
    zoomEl: boolean;
    shareEl: boolean;
    counterEl: boolean;
    arrowEl: boolean;
    preloaderEl: boolean;

    // Tap on sliding area should close gallery
    tapToClose: boolean;

    // Tap should toggle visibility of controls
    tapToToggleControls: boolean;

    // Mouse click on image should close the gallery,
    // only when image is smaller than size of the viewport
    clickToCloseNonZoomable: boolean;

    // Element classes click on which should close the PhotoSwipe.
    // In HTML markup, class should always start with "pswp__", e.g.: "pswp__item", "pswp__caption".
    // 
    // "pswp__ui--over-close" class will be added to root element of UI when mouse is over one of these elements
    // By default it's used to highlight the close button.
    closeElClasses: string[];

    // Separator for "1 of X" counter
    indexIndicatorSep: string;



    // Share buttons
    // 
    // Available variables for URL:
    // {{url}}             - url to current page
    // {{text}}            - title
    // {{image_url}}       - encoded image url
    // {{raw_image_url}}   - raw image url
    shareButtons: ShareButton[];
}

export interface ShareButton {
    id: string;
    label: string;
    url: string;
}

export interface LightboxMethods {
    getThumbBoundsFn: Function;
    getDoubleTapZoom: Function;
    isClickableElement: Function;
    addCaptionHTMLFn: Function;
}

export interface CustomOptions {
    enableBootstrap4: boolean;
}