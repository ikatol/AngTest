import { TestBed } from '@angular/core/testing';

import { CarEditDeleteService } from './car-edit-delete.service';

describe('CarEditDeleteService', () => {
  let service: CarEditDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarEditDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
