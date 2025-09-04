import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealermasterDetails } from './dealermaster-details';

describe('DealermasterDetails', () => {
  let component: DealermasterDetails;
  let fixture: ComponentFixture<DealermasterDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealermasterDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealermasterDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
