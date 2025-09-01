import { TestBed } from '@angular/core/testing';

import { DealermasterService } from './dealermaster-service';

describe('DealermasterService', () => {
  let service: DealermasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealermasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
