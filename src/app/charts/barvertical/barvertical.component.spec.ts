import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarverticalComponent } from './barvertical.component';

describe('BarverticalComponent', () => {
  let component: BarverticalComponent;
  let fixture: ComponentFixture<BarverticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarverticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarverticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
