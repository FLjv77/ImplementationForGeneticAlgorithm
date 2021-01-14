import { TestBed } from '@angular/core/testing';

import { SelfAdaptionService } from './self-adaption.service';

describe('SelfAdaptionService', () => {
  let service: SelfAdaptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfAdaptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
