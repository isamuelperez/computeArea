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

  describe('estimateStainArea', () => {
    it('should calculate the area correctly when all points are in the stain', () => {
      const totalImageArea = 1000;
      const ni = 100;
      const n = 100;
      expect(service.estimateStainArea(totalImageArea, ni, n)).toBe(1000);
    });

    it('should calculate the area correctly when half the points are in the stain', () => {
      const totalImageArea = 1000;
      const ni = 50;
      const n = 100;
      expect(service.estimateStainArea(totalImageArea, ni, n)).toBe(500);
    });

    it('should calculate the area correctly when no points are in the stain', () => {
      const totalImageArea = 1000;
      const ni = 0;
      const n = 100;
      expect(service.estimateStainArea(totalImageArea, ni, n)).toBe(0);
    });

    it('should return 0 when total points (n) is 0 to avoid division by zero', () => {
      const totalImageArea = 1000;
      const ni = 50;
      const n = 0;
      expect(service.estimateStainArea(totalImageArea, ni, n)).toBe(0);
    });

    it('should handle decimal values for area and points', () => {
      const totalImageArea = 1234.56;
      const ni = 30;
      const n = 100;
      expect(service.estimateStainArea(totalImageArea, ni, n)).toBeCloseTo(370.368);
    });
  });
});
