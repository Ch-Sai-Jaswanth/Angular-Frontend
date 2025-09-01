import { TestBed } from '@angular/core/testing';

import { Bikestore } from './bikestore';

describe('Bikestore', () => {
  let service: Bikestore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bikestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
