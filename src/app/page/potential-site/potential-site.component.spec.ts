import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialSiteComponent } from './potential-site.component';

describe('PotentialSiteComponent', () => {
  let component: PotentialSiteComponent;
  let fixture: ComponentFixture<PotentialSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
