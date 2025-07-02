import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaCalculationService {

  constructor() { }

  /**
   * Estima el área de la mancha.
   * @param totalImageArea Área total de la imagen (ancho * alto).
   * @param ni Número de puntos que caen dentro de la mancha.
   * @param n Número total de puntos generados.
   * @returns El área estimada de la mancha.
   */
  estimateStainArea(totalImageArea: number, ni: number, n: number): number {
    if (n === 0) {
      return 0; // Evitar división por cero
    }
    return totalImageArea * (ni / n);
  }
}
