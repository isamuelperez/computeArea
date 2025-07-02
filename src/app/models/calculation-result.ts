export interface CalculationResult {
  id: number;
  timestamp: Date;
  imageName: string;
  totalPoints: number;
  pointsInStain: number;
  totalImageArea: number;
  estimatedStainArea: number;
}
