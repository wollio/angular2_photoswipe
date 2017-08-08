import {Component, Input} from '@angular/core';
import {Image} from '../model/image.model';
import {LightboxService} from '../service/lightbox.service';
import {PhotoswipeImage} from "../model/photoswipe-image.model";

@Component({
  selector: 'lightbox',
  template: `
            <div class="angular2_photoswipe" itemscope itemtype="http://schema.org/ImageGallery">
              <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" *ngFor="let image of getImages()">
                <a href="{{image.largeUrl}}" itemprop="contentUrl" [attr.data-size]="image.size" (click)="openImage(image)">
                  <img src="{{image.thumbUrl}}" itemprop="thumbnail" alt="{{image.description}}" />
                </a>
                <figcaption itemprop="caption description">{{image.description}}</figcaption>
              </figure>
            </div>

            <!-- Root element of PhotoSwipe. Must have class pswp. -->
            <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
              <!-- Background of PhotoSwipe.
                     It's a separate element, as animating opacity is faster than rgba(). -->
              <div class="pswp__bg"></div>
              <!-- Slides wrapper with overflow:hidden. -->
              <div class="pswp__scroll-wrap">
                <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
                <!-- don't modify these 3 pswp__item elements, data is added later on. -->
                <div class="pswp__container">
                  <div class="pswp__item"></div>
                  <div class="pswp__item"></div>
                  <div class="pswp__item"></div>
                </div>
                <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                <div class="pswp__ui pswp__ui--hidden">
                  <div class="pswp__top-bar">
                    <!--  Controls are self-explanatory. Order can be changed. -->
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--share" title="Share"></button>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                    <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                      <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                          <div class="pswp__preloader__donut"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                  </div>
                  <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                  </button>
                  <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                  </button>
                  <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                  </div>
                </div>
              </div>
            </div>

            `,
  styles: [`
        /*! PhotoSwipe main CSS by Dmitry Semenov | photoswipe.com | MIT license */
/*
	Styles for basic PhotoSwipe functionality (sliding area, open/close transitions)
*/
/* pswp = photoswipe */
.pswp {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  -ms-touch-action: none;
  touch-action: none;
  z-index: 1500;
  -webkit-text-size-adjust: 100%;
  /* create separate layer, to avoid paint on window.onscroll in webkit/blink */
  -webkit-backface-visibility: hidden;
  outline: none; }
  .pswp * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box; }
  .pswp img {
    max-width: none; }

/* style is added when JS option showHideOpacity is set to true */
.pswp--animate_opacity {
  /* 0.001, because opacity:0 doesn't trigger Paint action, which causes lag at start of transition */
  opacity: 0.001;
  will-change: opacity;
  /* for open/close transition */
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--open {
  display: block; }

.pswp--zoom-allowed .pswp__img {
  /* autoprefixer: off */
  cursor: -webkit-zoom-in;
  cursor: -moz-zoom-in;
  cursor: zoom-in; }

.pswp--zoomed-in .pswp__img {
  /* autoprefixer: off */
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab; }

.pswp--dragging .pswp__img {
  /* autoprefixer: off */
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing; }

/*
	Background is added as a separate element.
	As animating opacity is much faster than animating rgba() background-color.
*/
.pswp__bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0;
  -webkit-backface-visibility: hidden;
  will-change: opacity; }

.pswp__scroll-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; }

.pswp__container,
.pswp__zoom-wrap {
  -ms-touch-action: none;
  touch-action: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; }

/* Prevent selection and tap highlights */
.pswp__container,
.pswp__img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
      user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none; }

.pswp__zoom-wrap {
  position: absolute;
  width: 100%;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  /* for open/close transition */
  -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp__bg {
  will-change: opacity;
  /* for open/close transition */
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--animated-in .pswp__bg,
.pswp--animated-in .pswp__zoom-wrap {
  -webkit-transition: none;
  transition: none; }

.pswp__container,
.pswp__zoom-wrap {
  -webkit-backface-visibility: hidden; }

.pswp__item {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden; }

.pswp__img {
  position: absolute;
  width: auto;
  height: auto;
  top: 0;
  left: 0; }

/*
	stretched thumbnail or div placeholder element (see below)
	style is added to avoid flickering in webkit/blink when layers overlap
*/
.pswp__img--placeholder {
  -webkit-backface-visibility: hidden; }

/*
	div element that matches size of large image
	large image loads on top of it
*/
.pswp__img--placeholder--blank {
  background: #222; }

.pswp--ie .pswp__img {
  width: 100% !important;
  height: auto !important;
  left: 0;
  top: 0; }

/*
	Error message appears when image is not loaded
	(JS option errorMsg controls markup)
*/
.pswp__error-msg {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  margin-top: -8px;
  color: #CCC; }

.pswp__error-msg a {
  color: #CCC;
  text-decoration: underline; }

/*! PhotoSwipe Default UI CSS by Dmitry Semenov | photoswipe.com | MIT license */
/*

	Contents:

	1. Buttons
	2. Share modal and links
	3. Index indicator ("1 of X" counter)
	4. Caption
	5. Loading indicator
	6. Additional styles (root element, top bar, idle state, hidden state, etc.)

*/
/*
	
	1. Buttons

 */
/* <button> css reset */
.pswp__button {
  width: 44px;
  height: 44px;
  position: relative;
  background: none;
  cursor: pointer;
  overflow: visible;
  -webkit-appearance: none;
  display: block;
  border: 0;
  padding: 0;
  margin: 0;
  float: right;
  opacity: 0.75;
  -webkit-transition: opacity 0.2s;
          transition: opacity 0.2s;
  -webkit-box-shadow: none;
          box-shadow: none; }
  .pswp__button:focus,
  .pswp__button:hover {
    opacity: 1; }
  .pswp__button:active {
    outline: none;
    opacity: 0.9; }
  .pswp__button::-moz-focus-inner {
    padding: 0;
    border: 0; }

/* pswp__ui--over-close class it added when mouse is over element that should close gallery */
.pswp__ui--over-close .pswp__button--close {
  opacity: 1; }

.pswp__button,
.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  background: url('data:text/html;base64,PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9Ijg4IiB2aWV3Qm94PSIwIDAgMjY0IDg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5kZWZhdWx0LXNraW4gMjwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Zz48cGF0aCBkPSJNNjcuMDAyIDU5LjV2My43NjhjLTYuMzA3Ljg0LTkuMTg0IDUuNzUtMTAuMDAyIDkuNzMyIDIuMjItMi44MyA1LjU2NC01LjA5OCAxMC4wMDItNS4wOThWNzEuNUw3MyA2NS41ODUgNjcuMDAyIDU5LjV6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTMgMjl2LTVoMnYzaDN2MmgtNXpNMTMgMTVoNXYyaC0zdjNoLTJ2LTV6TTMxIDE1djVoLTJ2LTNoLTN2LTJoNXpNMzEgMjloLTV2LTJoM3YtM2gydjV6IiBpZD0iU2hhcGUiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTYyIDI0djVoLTJ2LTNoLTN2LTJoNXpNNjIgMjBoLTV2LTJoM3YtM2gydjV6TTcwIDIwdi01aDJ2M2gzdjJoLTV6TTcwIDI0aDV2MmgtM3YzaC0ydi01eiIvPjwvZz48cGF0aCBkPSJNMjAuNTg2IDY2bC01LjY1Ni01LjY1NiAxLjQxNC0xLjQxNEwyMiA2NC41ODZsNS42NTYtNS42NTYgMS40MTQgMS40MTRMMjMuNDE0IDY2bDUuNjU2IDUuNjU2LTEuNDE0IDEuNDE0TDIyIDY3LjQxNGwtNS42NTYgNS42NTYtMS40MTQtMS40MTRMMjAuNTg2IDY2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTEuNzg1IDY1LjAzTDExMCA2My41bDMtMy41aC0xMHYtMmgxMGwtMy0zLjUgMS43ODUtMS40NjhMMTE3IDU5bC01LjIxNSA2LjAzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNTIuMjE1IDY1LjAzTDE1NCA2My41bC0zLTMuNWgxMHYtMmgtMTBsMy0zLjUtMS43ODUtMS40NjhMMTQ3IDU5bDUuMjE1IDYuMDN6IiBmaWxsPSIjZmZmIi8+PGc+PHBhdGggaWQ9IlJlY3RhbmdsZS0xMSIgZmlsbD0iI2ZmZiIgZD0iTTE2MC45NTcgMjguNTQzbC0zLjI1LTMuMjUtMS40MTMgMS40MTQgMy4yNSAzLjI1eiIvPjxwYXRoIGQ9Ik0xNTIuNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIGlkPSJPdmFsLTEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUwIDIxaDV2MWgtNXoiLz48L2c+PGc+PHBhdGggZD0iTTExNi45NTcgMjguNTQzbC0xLjQxNCAxLjQxNC0zLjI1LTMuMjUgMS40MTQtMS40MTQgMy4yNSAzLjI1eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDguNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA2IDIxaDV2MWgtNXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA5LjA0MyAxOS4wMDhsLS4wODUgNS0xLS4wMTcuMDg1LTV6Ii8+PC9nPjwvZz48L2c+PC9zdmc+') 0 0 no-repeat;
  background-size: 264px 88px;
  width: 44px;
  height: 44px; }

@media (-webkit-min-device-pixel-ratio: 1.1), (-webkit-min-device-pixel-ratio: 1.09375), (min-resolution: 105dpi), (min-resolution: 1.1dppx) {
  /* Serve SVG sprite if browser supports SVG and resolution is more than 105dpi */
  .pswp--svg .pswp__button,
  .pswp--svg .pswp__button--arrow--left:before,
  .pswp--svg .pswp__button--arrow--right:before {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAABYCAQAAACjBqE3AAAB6klEQVR4Ae3bsWpUQRTG8YkkanwCa7GzVotsI/gEgk9h4Vu4ySLYmMYgbJrc3lrwZbJwC0FMt4j7F6Y4oIZrsXtgxvx/1c0ufEX4cnbmLCmSJEmSJEmSJEmSJP3XCBPvbJU+8doWmDFwyZpLBmYlNJebz0KwzykwsuSYJSNwykEJreV2BaBMaLIQZ2xYcFgqDlmw4ayE/FwL0dDk4Qh4W37DAjgqIT+3HRbigjH+iikVdxgZStgyN0Su2sXIeTwTT+esdpcbIlfNAuZ/TxresG4zV8kYWSZNiKUTokMMSWeIwTNEn4fK2TW3gRNgVkJLuVksROA9G+bEvoATNlBCa7nZXEwdxEZxzpKRKFh+bsv8LmPFmhX1OwfIz81jIRJQ5eeqG9B+riRJkiRJkiRJkiRJkiRJkiRJUkvA/8RQoEpKlJWINFkJ62AlrEP/mNBibnv2yz/A3t7Uq3LcpoxP8COjC1T5vxoAD5VdoEqdDrd5QuW1swtUSaueh3zkiuBiqgtA2OlkeMcP/uDqugsJdbjHF65VdPMKwS0+WQc/MgKvrIOHysB9vgPwk8+85hmPbnQdvHZyDMAFD7L3EOpgMcVdvnHFS0/vlatrXvCVx0U9gt3fxvnA0/hB4nmRJEmSJEmSJEmSJGmHfgFLaDPoMu5xWwAAAABJRU5ErkJggg=='); }
  .pswp--svg .pswp__button--arrow--left,
  .pswp--svg .pswp__button--arrow--right {
    background: none; } }

.pswp__button--close {
  background-position: 0 -44px; }

.pswp__button--share {
  background-position: -44px -44px; }

.pswp__button--fs {
  display: none; }

.pswp--supports-fs .pswp__button--fs {
  display: block; }

.pswp--fs .pswp__button--fs {
  background-position: -44px 0; }

.pswp__button--zoom {
  display: none;
  background-position: -88px 0; }

.pswp--zoom-allowed .pswp__button--zoom {
  display: block; }

.pswp--zoomed-in .pswp__button--zoom {
  background-position: -132px 0; }

/* no arrows on touch screens */
.pswp--touch .pswp__button--arrow--left,
.pswp--touch .pswp__button--arrow--right {
  visibility: hidden; }

/*
	Arrow buttons hit area
	(icon is added to :before pseudo-element)
*/
.pswp__button--arrow--left,
.pswp__button--arrow--right {
  background: none;
  top: 50%;
  margin-top: -50px;
  width: 70px;
  height: 100px;
  position: absolute; }

.pswp__button--arrow--left {
  left: 0; }

.pswp__button--arrow--right {
  right: 0; }

.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  content: '';
  top: 35px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 30px;
  width: 32px;
  position: absolute; }

.pswp__button--arrow--left:before {
  left: 6px;
  background-position: -138px -44px; }

.pswp__button--arrow--right:before {
  right: 6px;
  background-position: -94px -44px; }

/*

	2. Share modal/popup and links

 */
.pswp__counter,
.pswp__share-modal {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
      user-select: none; }

.pswp__share-modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 10px;
  position: absolute;
  z-index: 1600;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease-out;
          transition: opacity 0.25s ease-out;
  -webkit-backface-visibility: hidden;
  will-change: opacity; }

.pswp__share-modal--hidden {
  display: none; }

.pswp__share-tooltip {
  z-index: 1620;
  position: absolute;
  background: #FFF;
  top: 56px;
  border-radius: 2px;
  display: block;
  width: auto;
  right: 44px;
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  -webkit-transform: translateY(6px);
      -ms-transform: translateY(6px);
          transform: translateY(6px);
  -webkit-transition: -webkit-transform 0.25s;
          transition: transform 0.25s;
  -webkit-backface-visibility: hidden;
  will-change: transform; }
  .pswp__share-tooltip a {
    display: block;
    padding: 8px 12px;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    line-height: 18px; }
    .pswp__share-tooltip a:hover {
      text-decoration: none;
      color: #000; }
    .pswp__share-tooltip a:first-child {
      /* round corners on the first/last list item */
      border-radius: 2px 2px 0 0; }
    .pswp__share-tooltip a:last-child {
      border-radius: 0 0 2px 2px; }

.pswp__share-modal--fade-in {
  opacity: 1; }
  .pswp__share-modal--fade-in .pswp__share-tooltip {
    -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
            transform: translateY(0); }

/* increase size of share links on touch devices */
.pswp--touch .pswp__share-tooltip a {
  padding: 16px 12px; }

a.pswp__share--facebook:before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: -12px;
  right: 15px;
  border: 6px solid transparent;
  border-bottom-color: #FFF;
  -webkit-pointer-events: none;
  -moz-pointer-events: none;
  pointer-events: none; }

a.pswp__share--facebook:hover {
  background: #3E5C9A;
  color: #FFF; }
  a.pswp__share--facebook:hover:before {
    border-bottom-color: #3E5C9A; }

a.pswp__share--twitter:hover {
  background: #55ACEE;
  color: #FFF; }

a.pswp__share--pinterest:hover {
  background: #CCC;
  color: #CE272D; }

a.pswp__share--download:hover {
  background: #DDD; }

/*

	3. Index indicator ("1 of X" counter)

 */
.pswp__counter {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  font-size: 13px;
  line-height: 44px;
  color: #FFF;
  opacity: 0.75;
  padding: 0 10px; }

/*
	
	4. Caption

 */
.pswp__caption {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 44px; }
  .pswp__caption small {
    font-size: 11px;
    color: #BBB; }

.pswp__caption__center {
  text-align: left;
  max-width: 420px;
  margin: 0 auto;
  font-size: 13px;
  padding: 10px;
  line-height: 20px;
  color: #CCC; }

.pswp__caption--empty {
  display: none; }

/* Fake caption element, used to calculate height of next/prev image */
.pswp__caption--fake {
  visibility: hidden; }

/*

	5. Loading indicator (preloader)

	You can play with it here - http://codepen.io/dimsemenov/pen/yyBWoR

 */
.pswp__preloader {
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -22px;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease-out;
          transition: opacity 0.25s ease-out;
  will-change: opacity;
  direction: ltr; }

.pswp__preloader__icn {
  width: 20px;
  height: 20px;
  margin: 12px; }

.pswp__preloader--active {
  opacity: 1; }
  .pswp__preloader--active .pswp__preloader__icn {
    /* We use .gif in browsers that don't support CSS animation */
    background: url('data:image/gif;base64,R0lGODlhFAAUAO+/vQgA77+977+977+9Pz8/V1dXJycn77+977+9z7fvv73vv73vv73vv73vv71vb2/vv73vv73vv70AAAAAAAAAAAAAAAAAAAAAAAAAAAAh77+9C05FVFNDQVBFMi4wAwEAAAAh77+9BAUHAAgALAAAAAAUABQAQARTEO+/vUnvv71F77+977+9Gu+/vQXvv71077+977+9JAhX77+9FhJBSEM8bHRN77+977+977+977+9W1xl77+9Wu+/vUMB77+9LO+/ve+/vW7vv73vv73vv710PATvv73vv73vv71ZVu+/ve+/vWzWrAE177+977+9RxLvv70RK8eL77+9YxTvv70QSVTvv73vv73vv73vv70iACHvv70EBQcACAAsAQABABIAEgAABE4Q77+9KUvvv704W++/ve+/vTHvv70mEQTvv71977+9SO+/ve+/vQliK9u+Ge+/ve+/vR0A77+977+9MCA6He+/ve+/vQvvv71wxJ/vv73vv73vv70x77+977+977+9LRDvv71E77+9GSrvv71y77+9IgQC77+977+977+977+977+977+9Yu+/ve+/vRx+StCdCAAh77+9BAUHAAgALAEAAQASABIAAAROEO+/vSnvv73vv704W++/vSkA77+9JhUF77+9fe+/vUjvv73vv70JYivbvhnvv73vv73vv71x77+9E0EgOh3vv73vv70L77+9cMSf77+977+977+9Me+/vQLvv71tMO+/vUTvv70ZKu+/vXLvv70iAgHvv73vv73vv73vv73vv73vv71i77+977+9HH5K0J0IACHvv70EBQcACAAsAQABABIAEgAABE4Q77+9KQHvv704W++/ve+/vTnvv70mGQbvv71977+9SO+/ve+/vQliK9u+Ge+/vd2dIO+/vVNRIDod77+977+9C++/vXDEn++/ve+/ve+/vTHvv73vv73vv73vv71A77+9RO+/vRkq77+9cu+/vSIGA++/ve+/ve+/ve+/ve+/ve+/vWLvv73vv70cfkrQnQgAIe+/vQQFBwAIACwBAAEAEgASAAAEThDvv70pz6E4W++/ve+/vRDvv70mAQDvv71977+9SO+/ve+/vQliK9u+Ge+/ve+/vV0Q77+977+9YSA6He+/ve+/vQvvv71wxJ/vv73vv73vv70x77+977+977+977+9UO+/vUTvv70ZKu+/vXLvv70iCATvv73vv73vv73vv73vv73vv71i77+977+9HH5K0J0IACHvv70EBQcACAAsAQABABIAEgAABE4Q77+9Ke+/ve+/vThb77+9aQjvv70mHQfvv71977+9SO+/ve+/vQliK9u+Ge+/ve+/ve+/vTDvv70TACA6He+/ve+/vQvvv71wxJ/vv73vv73vv70x77+9BO+/ve+/vWDvv71E77+9GSrvv71y77+9IgoF77+977+977+977+977+977+9Yu+/ve+/vRx+StCdCAAh77+9BAUHAAgALAEAAQASABIAAAROEO+/vSlD77+9OFvvv73vv70Y77+9JgkC77+9fe+/vUjvv73vv70JYivbvhnvv73vv70dQe+/ve+/vXEgOh3vv73vv70L77+9cMSf77+977+977+9Me+/ve+/ve+/vQ0A77+9RO+/vRkq77+9cu+/vSIMBu+/ve+/ve+/ve+/ve+/ve+/vWLvv73vv70cfkrQnQgAIe+/vQQFBwAHACwBAAEAEgASAAADQnjvv70677+9MDoXGSFt77+9EO+/ve+/ve+/ve+/vXXLh0EjWe+/vRFX77+9VVHvv73vv70gHO+/vUzvv712PsO877+977+9du+/vRHvv70G77+9ce+/vUwuD03vv70BAEBK77+977+9J++/ve+/ve+/vUYSADs=') 0 0 no-repeat; }

.pswp--css_animation .pswp__preloader--active {
  opacity: 1; }
  .pswp--css_animation .pswp__preloader--active .pswp__preloader__icn {
    -webkit-animation: clockwise 500ms linear infinite;
            animation: clockwise 500ms linear infinite; }
  .pswp--css_animation .pswp__preloader--active .pswp__preloader__donut {
    -webkit-animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite;
            animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite; }

.pswp--css_animation .pswp__preloader__icn {
  background: none;
  opacity: 0.75;
  width: 14px;
  height: 14px;
  position: absolute;
  left: 15px;
  top: 15px;
  margin: 0; }

.pswp--css_animation .pswp__preloader__cut {
  /* 
			The idea of animating inner circle is based on Polymer ("material") loading indicator 
			 by Keanu Lee https://blog.keanulee.com/2014/10/20/the-tale-of-three-spinners.html
		*/
  position: relative;
  width: 7px;
  height: 14px;
  overflow: hidden; }

.pswp--css_animation .pswp__preloader__donut {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  width: 14px;
  height: 14px;
  border: 2px solid #FFF;
  border-radius: 50%;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  margin: 0; }

@media screen and (max-width: 1024px) {
  .pswp__preloader {
    position: relative;
    left: auto;
    top: auto;
    margin: 0;
    float: right; } }

@-webkit-keyframes clockwise {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@keyframes clockwise {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@-webkit-keyframes donut-rotate {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  50% {
    -webkit-transform: rotate(-140deg);
            transform: rotate(-140deg); }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); } }

@keyframes donut-rotate {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  50% {
    -webkit-transform: rotate(-140deg);
            transform: rotate(-140deg); }
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); } }

/*
	
	6. Additional styles

 */
/* root element of UI */
.pswp__ui {
  -webkit-font-smoothing: auto;
  visibility: visible;
  opacity: 1;
  z-index: 1550; }

/* top black bar with buttons and "1 of X" indicator */
.pswp__top-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  width: 100%; }

.pswp__caption,
.pswp__top-bar,
.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right {
  -webkit-backface-visibility: hidden;
  will-change: opacity;
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

/* pswp--has_mouse class is added only when two subsequent mousemove events occur */
.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right {
  visibility: visible; }

.pswp__top-bar,
.pswp__caption {
  background-color: rgba(0, 0, 0, 0.5); }

/* pswp__ui--fit class is added when main image "fits" between top bar and bottom bar (caption) */
.pswp__ui--fit .pswp__top-bar,
.pswp__ui--fit .pswp__caption {
  background-color: rgba(0, 0, 0, 0.3); }

/* pswp__ui--idle class is added when mouse isn't moving for several seconds (JS option timeToIdle) */
.pswp__ui--idle .pswp__top-bar {
  opacity: 0; }

.pswp__ui--idle .pswp__button--arrow--left,
.pswp__ui--idle .pswp__button--arrow--right {
  opacity: 0; }

/*
	pswp__ui--hidden class is added when controls are hidden
	e.g. when user taps to toggle visibility of controls
*/
.pswp__ui--hidden .pswp__top-bar,
.pswp__ui--hidden .pswp__caption,
.pswp__ui--hidden .pswp__button--arrow--left,
.pswp__ui--hidden .pswp__button--arrow--right {
  /* Force paint & create composition layer for controls. */
  opacity: 0.001; }

/* pswp__ui--one-slide class is added when there is just one item in gallery */
.pswp__ui--one-slide .pswp__button--arrow--left,
.pswp__ui--one-slide .pswp__button--arrow--right,
.pswp__ui--one-slide .pswp__counter {
  display: none; }

.pswp__element--disabled {
  display: none !important; }

.pswp--minimal--dark .pswp__top-bar {
  background: none; }
 

`]
})
export class Lightbox {

  @Input('galleryKey') key:string;

  constructor(private lbService:LightboxService) {
  }

  public openImage(img : Image) {
    this.openPhotoSwipe(img, document.getElementsByClassName('angular2_photoswipe')[0]);
    return false;
  }

  public getImages():Image[] {
    return this.lbService.getImages(this.key);
  }

  private openPhotoSwipe(img:Image, galleryDOM:any):boolean {

    let options:PhotoSwipe.Options = {};
    options.galleryUID = galleryDOM.getAttribute('data-pswp-uid');
    options.index = img.id;
    const PSWP:HTMLElement = <HTMLElement> document.querySelectorAll('.pswp')[0];
    //new PhotoSwipe(PSWP, PhotoSwipeUI_Default, this.getImagesAsPhotoswipe(), options).init();
    return false;
  }

  private getImagesAsPhotoswipe():PhotoswipeImage[] {
    let items:PhotoswipeImage[] = [];
    items.length = 0;

    this.lbService.getImages(this.key).forEach(function(img){
      items.push(new PhotoswipeImage(img.largeUrl, 800, 800));
    });
    return items;
  }

  private logImage(img:Image) {
    console.log(img);
  }

}
