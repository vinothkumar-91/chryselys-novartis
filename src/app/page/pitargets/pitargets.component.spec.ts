import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PITargetsComponent } from './pitargets.component';

describe('PITargetsComponent', () => {
  let component: PITargetsComponent;
  let fixture: ComponentFixture<PITargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PITargetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PITargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
