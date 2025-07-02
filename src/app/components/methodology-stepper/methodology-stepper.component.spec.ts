import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologyStepperComponent } from './methodology-stepper.component';

describe('MethodologyStepperComponent', () => {
  let component: MethodologyStepperComponent;
  let fixture: ComponentFixture<MethodologyStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
