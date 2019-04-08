interface LightboxOptions {
  showHideTransitionDuration: number;
  controlsTransitionDuration: number;
  opacity: number;
  backgroundColor: string;
  placeholderColor: string;
  boxSizingBorderBox: boolean; // disable .pswp * { box-sizing:border-box } (in case you already have it in your site css)
  rootZIndex: number;
  assetsPath: string; //path to skin assets folder (preloader, PNG and SVG sprite)
  ErrorTextColor: string; // "Image not loaded" text color
  includeMinimalStyle: boolean;
}
