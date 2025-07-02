import { TestBed } from '@angular/core/testing';

import { ImageProcessingService } from './image-processing.service';

describe('ImageProcessingService', () => {
  let service: ImageProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   describe('generateRandomPoints', () => {
    it('should generate the specified number of points', () => {
      const n = 100;
      const width = 800;
      const height = 600;
      const points = service.generateRandomPoints(n, width, height);
      expect(points.length).toBe(n);
    });

    it('should generate points within the specified dimensions', () => {
      const n = 10;
      const width = 100;
      const height = 50;
      const points = service.generateRandomPoints(n, width, height);

      points.forEach(point => {
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThan(width);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThan(height);
      });
    });

    it('should return an empty array if n is 0', () => {
      const points = service.generateRandomPoints(0, 100, 100);
      expect(points.length).toBe(0);
    });
  });

  
});
