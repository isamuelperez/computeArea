import { TestBed } from '@angular/core/testing';

import { AreaCalculationService } from './area-calculation.service';

describe('AreaCalculationService', () => {
  let service: AreaCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
