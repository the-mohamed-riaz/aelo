import { TestBed } from '@angular/core/testing';

import { ActivatorGuard } from './activator.guard';

describe('ActivatorGuard', () => {
  let guard: ActivatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
