import { TestBed } from '@angular/core/testing';

import { ExactRelationService } from './exact-relation.service';

describe('ExactRelationService', () => {
  let service: ExactRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExactRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
