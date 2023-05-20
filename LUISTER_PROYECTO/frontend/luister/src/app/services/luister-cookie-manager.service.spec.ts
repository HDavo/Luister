import { TestBed } from '@angular/core/testing';

import { LuisterCookieManagerService } from './luister-cookie-manager.service';

describe('LuisterCookieManagerService', () => {
  let service: LuisterCookieManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuisterCookieManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
