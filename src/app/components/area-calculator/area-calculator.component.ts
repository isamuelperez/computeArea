import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageProcessingService } from '../../services/image-processing.service';
import { AreaCalculationService } from '../../services/area-calculation.service';
import { ResultsService } from '../../services/results.service';
import { Subscription, catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-area-calculator',
  templateUrl: './area-calculator.component.html',
  styleUrls: ['./area-calculator.component.css']
})
export class AreaCalculatorComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;
  imageDimensions: { width: number, height: number } | null = null;
  totalImageArea: number | null = null;
  numberOfPoints: number = 20000; // Valor por defecto
  estimatedArea: number | null = null;
  calculationInProgress: boolean = false;
  uploadError: string | null = null;
  calculationError: string | null = null;

  lastCalculationDetails: { totalPoints: number; pointsInStain: number } = { totalPoints: 0, pointsInStain: 0 };

  private imageSubscription: Subscription | null = null;

  constructor(
    private imageProcessingService: ImageProcessingService,
    private areaCalculationService: AreaCalculationService,
    private resultsService: ResultsService
  ) { }

  ngOnInit(): void {
    // Escuchar cambios en las dimensiones de la imagen desde el servicio
    this.imageSubscription = this.imageProcessingService.imageDimensions$.subscribe(
      dims => {
        this.imageDimensions = dims;
        this.totalImageArea = dims ? dims.width * dims.height : null;
      }
    );
  }

  ngOnDestroy(): void {
    this.imageSubscription?.unsubscribe();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadError = null;
      this.imageProcessingService.loadImageAndGetDimensions(this.selectedFile)
        .pipe(
          catchError(err => {
            console.error('Error al cargar la imagen o obtener dimensiones:', err);
            this.uploadError = 'No se pudo cargar la imagen o obtener sus dimensiones. Asegúrate de que sea un archivo de imagen válido.';
            this.selectedFile = null;
            this.imageDimensions = null;
            this.totalImageArea = null;
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.selectedFile = null;
      this.imageDimensions = null;
      this.totalImageArea = null;
      this.uploadError = 'No se seleccionó ningún archivo.';
    }
  }

  formatLabel(value: number): string {
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'M';
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  calculateArea(): void {
    if (!this.selectedFile || !this.imageDimensions || !this.totalImageArea) {
      this.calculationError = 'Por favor, sube una imagen y asegúrate de que sus dimensiones son válidas.';
      return;
    }

    this.calculationInProgress = true;
    this.calculationError = null;

    const points = this.imageProcessingService.generateRandomPoints(
      this.numberOfPoints,
      this.imageDimensions.width,
      this.imageDimensions.height
    );

    this.imageProcessingService.countPointsInStain(this.selectedFile, points)
      .pipe(
        catchError(err => {
          console.error('Error al contar los puntos en la mancha:', err);
          this.calculationError = 'Hubo un error al procesar la imagen para contar los puntos. Intenta de nuevo.';
          this.calculationInProgress = false;
          return of(0);
        })
      )
      .subscribe(ni => {
        if (ni !== undefined) {
          this.estimatedArea = this.areaCalculationService.estimateStainArea(
            this.totalImageArea!,
            ni,
            this.numberOfPoints
          );

          this.lastCalculationDetails = {
            totalPoints: this.numberOfPoints,
            pointsInStain: ni
          };

          this.resultsService.addResult({
            imageName: this.selectedFile?.name || 'Imagen Desconocida',
            totalPoints: this.numberOfPoints,
            pointsInStain: ni,
            totalImageArea: this.totalImageArea!,
            estimatedStainArea: this.estimatedArea
          });
        }
        this.calculationInProgress = false;
      });
  }
}