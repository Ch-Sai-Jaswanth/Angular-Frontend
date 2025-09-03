import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealer } from './edit-dealer';

describe('EditDealer', () => {
  let component: EditDealer;
  let fixture: ComponentFixture<EditDealer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDealer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDealer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
