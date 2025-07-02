import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalculationResult } from '../models/calculation-result';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private _results = new BehaviorSubject<CalculationResult[]>(
    this.loadResults()
  );
  results$: Observable<CalculationResult[]> = this._results.asObservable();

  constructor() {}

  /**
   * Carga los resultados guardados desde el almacenamiento local.
   * @returns Un array de CalculationResult.
   */
  private loadResults(): CalculationResult[] {
    try {
      const storedResults = localStorage.getItem('stainAreaResults');
      return storedResults
        ? JSON.parse(storedResults).map((r: any) => ({
            ...r,
            timestamp: new Date(r.timestamp), // Convertir la cadena de fecha a objeto Date
          }))
        : [];
    } catch (e) {
      console.error('Error loading results from localStorage', e);
      return [];
    }
  }

  /**
   * Guarda los resultados actuales en el almacenamiento local.
   * @param results El array de resultados a guardar.
   */
  private saveResults(results: CalculationResult[]): void {
    try {
      localStorage.setItem('stainAreaResults', JSON.stringify(results));
    } catch (e) {
      console.error('Error saving results to localStorage', e);
    }
  }

  /**
   * Añade un nuevo resultado de cálculo.
   * @param newResult El nuevo resultado a añadir.
   */
  addResult(newResult: Omit<CalculationResult, 'id' | 'timestamp'>): void {
    const currentResults = this._results.getValue();
    const resultWithId: CalculationResult = {
      ...newResult,
      id:
        currentResults.length > 0
          ? Math.max(...currentResults.map((r) => r.id)) + 1
          : 1,
      timestamp: new Date(),
    };
    const updatedResults = [...currentResults, resultWithId];
    this._results.next(updatedResults);
    this.saveResults(updatedResults);
  }

  /**
   * Elimina un resultado por su ID.
   * @param id El ID del resultado a eliminar.
   */
  deleteResult(id: number): void {
    const currentResults = this._results.getValue();
    const updatedResults = currentResults.filter((result) => result.id !== id);
    this._results.next(updatedResults);
    this.saveResults(updatedResults);
  }

  clearAllResults(): void {
    this._results.next([]);
    this.saveResults([]);
  }
}
