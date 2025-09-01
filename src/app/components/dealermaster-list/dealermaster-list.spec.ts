import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealermasterList } from './dealermaster-list';

describe('DealermasterList', () => {
  let component: DealermasterList;
  let fixture: ComponentFixture<DealermasterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealermasterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealermasterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
