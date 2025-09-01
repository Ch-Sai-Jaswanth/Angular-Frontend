import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerList } from './dealer-list';

describe('DealerList', () => {
  let component: DealerList;
  let fixture: ComponentFixture<DealerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
