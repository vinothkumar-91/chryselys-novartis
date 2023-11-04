import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdetailComponent } from './edetail.component';

describe('EdetailComponent', () => {
  let component: EdetailComponent;
  let fixture: ComponentFixture<EdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
