import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDetails } from './dealer-details';

describe('DealerDetails', () => {
  let component: DealerDetails;
  let fixture: ComponentFixture<DealerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
