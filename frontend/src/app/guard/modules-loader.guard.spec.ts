import { TestBed } from '@angular/core/testing';

import { ModulesLoaderGuard } from './modules-loader.guard';

describe('ModulesLoaderGuard', () => {
  let guard: ModulesLoaderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModulesLoaderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
