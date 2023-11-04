import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonloaderComponent } from './commonloader.component';

describe('CommonloaderComponent', () => {
  let component: CommonloaderComponent;
  let fixture: ComponentFixture<CommonloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
