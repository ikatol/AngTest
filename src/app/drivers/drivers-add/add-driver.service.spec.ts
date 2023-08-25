import { TestBed } from '@angular/core/testing';

import { AddDriverService } from './add-driver.service';

describe('AddDriverService', () => {
  let service: AddDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
