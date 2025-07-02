import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  private _imageDimensions = new BehaviorSubject<{ width: number, height: number } | null>(null);
  imageDimensions$ = this._imageDimensions.asObservable();

  constructor() { }

  /**
   * Carga una imagen binaria y extrae sus dimensiones.
   * @param file El archivo de imagen binaria.
   * @returns Un Observable que emite las dimensiones de la imagen.
   */
  loadImageAndGetDimensions(file: File): Observable<{ width: number, height: number }> {
    return new Observable(observer => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        img.onload = () => {
          this._imageDimensions.next({ width: img.width, height: img.height });
          observer.next({ width: img.width, height: img.height });
          observer.complete();
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Genera n puntos 2D aleatorios dentro de las dimensiones de la imagen.
   * @param n El número de puntos a generar.
   * @param width El ancho de la imagen.
   * @param height La altura de la imagen.
   * @returns Un array de objetos {x, y} representando los puntos.
   */
  generateRandomPoints(n: number, width: number, height: number): { x: number, y: number }[] {
    const points: { x: number, y: number }[] = [];
    for (let i = 0; i < n; i++) {
      points.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      });
    }
    return points;
  }

  /**
   * Cuenta el número de puntos que caen dentro de la mancha blanca.
   * Requiere dibujar la imagen en un canvas para leer los píxeles.
   * @param file La imagen binaria.
   * @param points Los puntos generados aleatoriamente.
   * @returns Un Observable que emite el número de puntos dentro de la mancha.
   */
  countPointsInStain(file: File, points: { x: number, y: number }[]): Observable<number> {
    return new Observable(observer => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            observer.error('Could not get 2D context from canvas');
            return;
          }
          ctx.drawImage(img, 0, 0);

          let pointsInStain = 0;
          for (const point of points) {
            // Obtener el color del píxel en las coordenadas del punto
            // ImageData.data devuelve un Uint8ClampedArray en el formato [R, G, B, A, R, G, B, A, ...]
            // Modelo RGB (Red, Green, Blue)
            const pixelData = ctx.getImageData(point.x, point.y, 1, 1).data;
            const r = pixelData[0];
            const g = pixelData[1];
            const b = pixelData[2];

            // Consideramos blanco si todos los componentes de color son 255
            if (r === 255 && g === 255 && b === 255) {
              pointsInStain++;
            }
          }
          observer.next(pointsInStain);
          observer.complete();
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }
}

