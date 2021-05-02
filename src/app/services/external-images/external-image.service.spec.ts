import { TestBed } from '@angular/core/testing';

import { ExternalImageService } from './external-image.service';

describe('ExternalImageService', () => {
  let service: ExternalImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
