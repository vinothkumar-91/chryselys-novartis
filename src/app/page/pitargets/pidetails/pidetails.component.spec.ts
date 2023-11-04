import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PidetailsComponent } from './pidetails.component';

describe('PidetailsComponent', () => {
  let component: PidetailsComponent;
  let fixture: ComponentFixture<PidetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PidetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
