import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BikeStoreService } from '../../services/bikestore';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function bikeIdExistsValidator(service: BikeStoreService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return service.checkBikeExists(control.value).pipe(
      map(exists => (exists ? { bikeExists: true } : null)),
      catchError(() => of(null))
    );
  };
}


@Component({
  selector: 'app-bike-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bike-form.html',
  styleUrls: ['./bike-form.css']
})
export class BikeForm implements OnInit {
  bikeForm!: FormGroup;

  constructor(private fb: FormBuilder, private bikeService: BikeStoreService, private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.bikeForm = this.fb.group({
      bikeId: [null, {
      validators: [Validators.required, Validators.min(1)],
      asyncValidators: [bikeIdExistsValidator(this.bikeService)],
      updateOn: 'blur'
    }],
    modelName: ['', [Validators.required, Validators.minLength(2)]],
    modelYear: [null, [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
    engineCc: [null, [Validators.required, Validators.min(50)]],
    manufacturer: ['', [Validators.required, Validators.minLength(2)]]
  });
  }

  onSubmit(): void {
    if (this.bikeForm.valid) {
      const role = localStorage.getItem('role');
      if (role === 'Admin' || role === 'Producer') {
        this.bikeService.addBike(this.bikeForm.value).subscribe(() => {
        alert('Bike added successfully!');
        this.bikeForm.reset();
        this.router.navigate(['/bikes']);
      });
      }
      else
    {
      alert("You are not allowed to perform this action");
      this.bikeForm.reset();
    }
    }
  }
  goBack(): void {
    this.location.back();
  }
}
