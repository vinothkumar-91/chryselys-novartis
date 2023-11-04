import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferraltargetsComponent } from './referraltargets.component';

describe('ReferraltargetsComponent', () => {
  let component: ReferraltargetsComponent;
  let fixture: ComponentFixture<ReferraltargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferraltargetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferraltargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
