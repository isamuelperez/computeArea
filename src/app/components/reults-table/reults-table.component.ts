import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalculationResult } from 'src/app/models/calculation-result';
import { ResultsService } from 'src/app/services/results.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reults-table',
  templateUrl: './reults-table.component.html',
  styleUrls: ['./reults-table.component.css']
})
export class ReultsTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'timestamp',
    'imageName',
    'totalPoints',
    'pointsInStain',
    'totalImageArea',
    'estimatedStainArea',
    'actions'
  ];
  dataSource = new MatTableDataSource<CalculationResult>();
  private resultsSubscription: Subscription | null = null;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.resultsSubscription = this.resultsService.results$.subscribe(results => {
      this.dataSource.data = results;
    });
  }

  ngOnDestroy(): void {
    this.resultsSubscription?.unsubscribe();
  }

  deleteResult(id: number): void {
    this.resultsService.deleteResult(id);
  }

  clearAllResults(): void {
    if (confirm('¿Estás seguro de que quieres borrar todos los resultados? Esta acción es irreversible.')) {
      this.resultsService.clearAllResults();
    }
  }
}
