import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeForm } from './bike-form';

describe('BikeForm', () => {
  let component: BikeForm;
  let fixture: ComponentFixture<BikeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
