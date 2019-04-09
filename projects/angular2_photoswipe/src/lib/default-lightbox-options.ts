import { LightboxOptions } from './lightbox-options';

export const DefaultLightboxOptions: LightboxOptions = {
    ErrorTextColor: 'red',
    assetsPath: '/assets',
    backgroundColor: 'green',
    boxSizingBorderBox: true,
    controlsTransitionDuration: 333,
    includeMinimalStyle: false,
    opacity: 1,
    placeholderColor: 'white',
    rootZIndex: 1500,
    showHideTransitionDuration: 333,
}

export interface LightboxToken {
    default: LightboxOptions;
    options: Partial<LightboxOptions>;
  }