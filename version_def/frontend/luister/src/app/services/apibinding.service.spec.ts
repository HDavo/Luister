import { TestBed } from '@angular/core/testing';

import { ApibindingService } from './apibinding.service';

describe('ApibindingService', () => {
  let service: ApibindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApibindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
