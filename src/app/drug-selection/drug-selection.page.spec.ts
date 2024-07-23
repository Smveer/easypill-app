import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugSelectionPage } from './drug-selection.page';

describe('DrugSelectionPage', () => {
  let component: DrugSelectionPage;
  let fixture: ComponentFixture<DrugSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
