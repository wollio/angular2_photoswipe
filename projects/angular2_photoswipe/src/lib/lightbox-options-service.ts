import { LightboxOptions } from './lightbox-options.ts'

class LightxoxOptionsService {
  constructor(readonly lightboxOptions: LightboxOptions) {}
}
 
const LIGHTBOX_OPTIONS = new InjectionToken<LightBoxOptionsService>('LightboxOptions', {
  providedIn: 'root',
  factory: () => new LightboxOptionsService(inject(LightboxOptions)),
});
