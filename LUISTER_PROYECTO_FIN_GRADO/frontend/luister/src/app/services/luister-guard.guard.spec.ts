import { TestBed } from '@angular/core/testing';

import { LuisterGuardGuard } from './luister-guard.guard';

describe('LuisterGuardGuard', () => {
  let guard: LuisterGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LuisterGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
