import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReultsTableComponent } from './reults-table.component';

describe('ReultsTableComponent', () => {
  let component: ReultsTableComponent;
  let fixture: ComponentFixture<ReultsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReultsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
