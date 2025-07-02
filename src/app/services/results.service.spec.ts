import { TestBed } from '@angular/core/testing';
import { ResultsService } from './results.service';
import { first } from 'rxjs';

describe('ResultsService', () => {
  let service: ResultsService;
  let store: { [key: string]: string };

  beforeEach(() => {
    // Mockear localStorage
    store = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return store[key] || null;
      },
      setItem: (key: string, value: string): void => {
        store[key] = value;
      },
      removeItem: (key: string): void => {
        delete store[key];
      },
      clear: (): void => {
        store = {};
      }
    };

    // Sobreescribir el localStorage global para las pruebas
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    

    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addResult', () => {
    it('should add a new result and update the observable', (done) => {
      const newResult = {
        imageName: 'test.png',
        totalPoints: 1000,
        pointsInStain: 500,
        totalImageArea: 100000,
        estimatedStainArea: 50000
      };

      service.results$.subscribe(results => {
        if (results.length > 0) { 
          expect(results.length).toBe(1);
          expect(results[0].imageName).toBe(newResult.imageName);
          expect(results[0].id).toBe(1); 
          expect(results[0].timestamp).toBeInstanceOf(Date);
          done(); 
        }
      });
      service.addResult(newResult);
    });

    it('should assign incremental IDs', (done) => {
      const result1 = { imageName: 'img1.png', totalPoints: 1, pointsInStain: 1, totalImageArea: 1, estimatedStainArea: 1 };
      const result2 = { imageName: 'img2.png', totalPoints: 2, pointsInStain: 2, totalImageArea: 2, estimatedStainArea: 2 };

      service.addResult(result1);
      service.addResult(result2);

      service.results$.subscribe(results => {
        if (results.length === 2) {
          expect(results[0].id).toBe(1);
          expect(results[1].id).toBe(2);
          done();
        }
      });
    });

    it('should save results to localStorage', () => {
      const newResult = {
        imageName: 'test.png',
        totalPoints: 1000,
        pointsInStain: 500,
        totalImageArea: 100000,
        estimatedStainArea: 50000
      };
      service.addResult(newResult);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'stainAreaResults',
        jasmine.any(String)
      );

      const stored = JSON.parse(localStorage.getItem('stainAreaResults') as string);
      expect(stored.length).toBe(1);
      expect(stored[0].imageName).toBe(newResult.imageName);
    });
  });

describe('deleteResult', () => {
    it('should remove a result by ID', (done) => {
      const result1 = { imageName: 'img1.png', totalPoints: 1, pointsInStain: 1, totalImageArea: 1, estimatedStainArea: 1 };
      const result2 = { imageName: 'img2.png', totalPoints: 2, pointsInStain: 2, totalImageArea: 2, estimatedStainArea: 2 };
      service.addResult(result1);
      service.addResult(result2);

      service.results$.pipe(first()).subscribe(results => {
        expect(results.length).toBe(2);
        expect(results[0].imageName).toBe('img1.png');
        done();
      });

      service.deleteResult(1);
    });

    it('should not remove anything if ID does not exist', (done) => {
      const result1 = { imageName: 'img1.png', totalPoints: 1, pointsInStain: 1, totalImageArea: 1, estimatedStainArea: 1 };
      service.addResult(result1); 

      service.results$.pipe(first()).subscribe(results => {
        expect(results.length).toBe(1);
        expect(results[0].id).toBe(1);
        done();
      });

      service.deleteResult(999);
    });
  });

  describe('clearAllResults', () => {
    it('should clear all results and update the observable', (done) => {
      const result1 = { imageName: 'img1.png', totalPoints: 1, pointsInStain: 1, totalImageArea: 1, estimatedStainArea: 1 };
      service.addResult(result1);

      service.results$.subscribe(results => {
        if (results.length === 0) { 
          expect(results.length).toBe(0);
          done();
        }
      });
      service.clearAllResults();
    });

    it('should clear localStorage', () => {
      const result1 = { imageName: 'img1.png', totalPoints: 1, pointsInStain: 1, totalImageArea: 1, estimatedStainArea: 1 };
      service.addResult(result1);
      service.clearAllResults();
      expect(JSON.parse(localStorage.getItem('stainAreaResults')!)).toEqual([]);
    });
  });

});
