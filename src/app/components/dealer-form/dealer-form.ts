import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealerService } from '../../services/dealer';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

export function dealerIdExistsValidator(service: DealerService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return service.checkDealerExists(control.value).pipe(
      map(exists => (exists ? { dealerExists: true } : null)),
      catchError(() => of(null))
    );
  };
}

export const inventoryWithinCapacityValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const capacity = group.get('storageCapacity')?.value;
  const inventory = group.get('inventory')?.value;

  if (capacity != null && inventory != null && inventory > capacity) {
    return { outOfCapacity: true };
  }
  return null;
};

@Component({
  selector: 'app-dealer-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './dealer-form.html',
  styleUrl: './dealer-form.css'
})
export class DealerForm implements OnInit {
  dealerForm!: FormGroup;

  constructor(private fb: FormBuilder, private dealerService: DealerService, private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.dealerForm = this.fb.group({
      dealerId: [null, {
      validators: [Validators.required, Validators.min(1)],
      asyncValidators: [dealerIdExistsValidator(this.dealerService)],
      updateOn: 'blur'
    }],
      dealerName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      zipCode: [null, [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      storageCapacity: [0, [Validators.required, Validators.min(1)]],
      inventory: [null, [Validators.required, Validators.min(0)]]
    }, { validators: inventoryWithinCapacityValidator });
  }

  onSubmit(): void {
    if (this.dealerForm.valid) {
      const role = localStorage.getItem('role');
      if (role === 'Admin' || role === 'Dealer') {
        this.dealerService.addDealer(this.dealerForm.value).subscribe(() => {
        Swal.fire('Success!', 'Dealer added successfully', 'success');
        this.dealerForm.reset();
        this.router.navigate(['/dealers']);
      });
    }
    else
    {
      Swal.fire('Oops!', 'You are not allowed to perform this action', 'error');
      this.dealerForm.reset();
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
        const dealers = JSON.parse(fileContent); // must be array

        if (!Array.isArray(dealers)) {
          Swal.fire('Error', 'Invalid file format. Expected an array of dealers.', 'error');
          return;
        }

        const role = localStorage.getItem('role');
        if (role === 'Admin' || role === 'Dealer') {
          this.dealerService.addDealersBulk(dealers).subscribe({
            next: (res) => {
              Swal.fire('Success!', `${res.inserted} dealers added successfully.`, 'success');
            },
            error: (err) => {
              console.error(err);
              Swal.fire('Error', 'Failed to upload dealers.', 'error');
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
