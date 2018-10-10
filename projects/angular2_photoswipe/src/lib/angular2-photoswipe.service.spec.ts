import { TestBed } from '@angular/core/testing';

import { Angular2PhotoswipeService } from './angular2-photoswipe.service';

describe('Angular2PhotoswipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Angular2PhotoswipeService = TestBed.get(Angular2PhotoswipeService);
    expect(service).toBeTruthy();
  });
});
