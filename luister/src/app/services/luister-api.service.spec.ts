import { TestBed } from '@angular/core/testing';

import { LuisterApiService } from './luister-api.service';

describe('LuisterApiService', () => {
  let service: LuisterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuisterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
