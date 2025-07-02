import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Para ngModel en el slide

import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input'; // Para el input de archivo si es necesario
import { MatIconModule } from '@angular/material/icon'; // Para iconos como upload, delete
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { AreaCalculatorComponent } from './components/area-calculator/area-calculator.component';
import { ReultsTableComponent } from './components/reults-table/reults-table.component';
import { MethodologyStepperComponent } from './components/methodology-stepper/methodology-stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaCalculatorComponent,
    ReultsTableComponent,
    MethodologyStepperComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatSliderModule,
    MatButtonModule,
    MatStepperModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
