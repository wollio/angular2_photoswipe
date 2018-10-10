import { TestBed } from '@angular/core/testing';

import { NgpService } from './ngp.service';

describe('NgpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgpService = TestBed.get(NgpService);
    expect(service).toBeTruthy();
  });
});
