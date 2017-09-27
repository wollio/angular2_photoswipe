import './vendor.browser';
import './polyfills.browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import './global.css';

export const platformRef = platformBrowserDynamic();

export function main() {
    return platformRef.bootstrapModule(AppModule)
        .catch(err => console.error(err));
}

// support async tag or hmr
switch (document.readyState) {
    case 'interactive':
    case 'complete':
        main();
        break;
    case 'loading':
    default:
        document.addEventListener('DOMContentLoaded', () => main());
}
