import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBike } from './edit-bike';

describe('EditBike', () => {
  let component: EditBike;
  let fixture: ComponentFixture<EditBike>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBike]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBike);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
