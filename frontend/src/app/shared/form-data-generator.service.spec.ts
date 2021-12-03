import { TestBed } from '@angular/core/testing';

import { FormDataGeneratorService } from './form-data-generator.service';

describe('FormDataGeneratorService', () => {
  let service: FormDataGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
