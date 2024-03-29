import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversViewComponent } from './drivers-view.component';

describe('DriversViewComponent', () => {
  let component: DriversViewComponent;
  let fixture: ComponentFixture<DriversViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriversViewComponent]
    });
    fixture = TestBed.createComponent(DriversViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
