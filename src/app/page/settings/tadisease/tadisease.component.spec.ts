import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TADiseaseComponent } from './tadisease.component';

describe('TADiseaseComponent', () => {
  let component: TADiseaseComponent;
  let fixture: ComponentFixture<TADiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TADiseaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TADiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
