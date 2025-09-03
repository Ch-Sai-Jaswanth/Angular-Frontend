import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealermaster } from './edit-dealermaster';

describe('EditDealermaster', () => {
  let component: EditDealermaster;
  let fixture: ComponentFixture<EditDealermaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDealermaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDealermaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
