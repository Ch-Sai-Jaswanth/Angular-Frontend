import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BikeStoreService } from '../../services/bikestore';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

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
          Swal.fire('Success!', 'Bike added successfully.', 'success');
        this.bikeForm.reset();
        this.router.navigate(['/bikes']);
      });
      }
      else
    {
      Swal.fire('Oops!', 'You are not allowed to perform this action', 'error');
      this.bikeForm.reset();
    }
    }
  }
  goBack(): void {
    this.location.back();
  }
  onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const fileContent = e.target.result;
        const bikes = JSON.parse(fileContent);

        if (!Array.isArray(bikes)) {
          Swal.fire('Error', 'Invalid file format. Expected an array of bikes.', 'error');
          return;
        }

        const role = localStorage.getItem('role');
        if (role === 'Admin' || role === 'Producer') {
          this.bikeService.addBikesBulk(bikes).subscribe({
            next: (res) => {
              Swal.fire('Success!', `${res.inserted} bikes added successfully.`, 'success');
            },
            error: (err) => {
              console.error(err);
              Swal.fire('Error', 'Failed to upload bikes.', 'error');
            }
          });
        } else {
          Swal.fire('Oops!', 'You are not allowed to perform this action', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Invalid JSON format in file.', 'error');
      }
    };
    reader.readAsText(file);
  }
}
}
