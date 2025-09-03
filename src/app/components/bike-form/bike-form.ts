import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BikeStoreService } from '../../services/bikestore';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

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
      bikeId: [null, Validators.required],
      modelName: ['', Validators.required],
      modelYear: [null],
      engineCc: [null],
      manufacturer: ['']
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
    }
  }
  goBack(): void {
    this.location.back();
  }
}
