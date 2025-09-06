import { Component } from '@angular/core';
import { BikeStore } from '../../models/bike-store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeStoreService } from '../../services/bikestore';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-bike',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-bike.html',
  styleUrl: './edit-bike.css'
})
export class EditBike {
  bikeForm!: FormGroup;
  bikeId!: number;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeStoreService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.bikeId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadBike();
  }

  initForm(): void {
    this.bikeForm = this.fb.group({
      modelName: ['', Validators.required],
      modelYear: [null],
      engineCc: [null],
      manufacturer: ['']
    });
  }

  loadBike(): void {
    this.bikeService.getBikeById(this.bikeId).subscribe({
      next: (bike: BikeStore) => {
        this.bikeForm.patchValue(bike);
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading bike:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.bikeForm.invalid) return;

    const updatedBike: BikeStore = {
      bikeId: this.bikeId,
      ...this.bikeForm.value
    };

    this.bikeService.updateBike(this.bikeId, updatedBike).subscribe({
      next: () => {
        Swal.fire('Success!', 'Bike updated successfully', 'success');
        this.router.navigate(['/bikes'])
      },
      error: err => console.error('Update failed:', err)
    });
  }
  goBack(): void {
    this.location.back();
  }
}
