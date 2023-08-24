import { TestBed } from '@angular/core/testing';

import { CarAdditionService } from './car-addition.service';

describe('CarAdditionService', () => {
  let service: CarAdditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarAdditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
