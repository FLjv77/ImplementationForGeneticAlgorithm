import { TestBed } from '@angular/core/testing';

import { FirstProjectServiceService } from './first-project-service.service';

describe('FirstProjectServiceService', () => {
  let service: FirstProjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstProjectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
