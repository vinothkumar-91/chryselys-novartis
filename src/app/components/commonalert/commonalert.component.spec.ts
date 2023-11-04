import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonalertComponent } from './commonalert.component';

describe('CommonalertComponent', () => {
  let component: CommonalertComponent;
  let fixture: ComponentFixture<CommonalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonalertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
