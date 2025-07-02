import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologyStepperComponent } from './methodology-stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MethodologyStepperComponent', () => {
  let component: MethodologyStepperComponent;
  let fixture: ComponentFixture<MethodologyStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatStepperModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      declarations: [ MethodologyStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodologyStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
