import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REDPLANUPComponent } from './redplanup.component';

describe('REDPLANUPComponent', () => {
  let component: REDPLANUPComponent;
  let fixture: ComponentFixture<REDPLANUPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ REDPLANUPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(REDPLANUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
