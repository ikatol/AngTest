import { TestBed } from '@angular/core/testing';

import { DriverEditDeleteService } from './driver-edit-delete.service';

describe('DriverEditDeleteService', () => {
  let service: DriverEditDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverEditDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
