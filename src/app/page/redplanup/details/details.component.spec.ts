import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REDPLANUPDetails } from './details.component';

describe('REDPLANUPDetails', () => {
  let component: REDPLANUPDetails;
  let fixture: ComponentFixture<REDPLANUPDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ REDPLANUPDetails ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(REDPLANUPDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
