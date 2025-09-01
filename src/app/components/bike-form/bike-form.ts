import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BikeStoreService } from '../../services/bikestore';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-bike-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bike-form.html',
  styleUrls: ['./bike-form.css']
})
export class BikeForm implements OnInit {
  bikeForm!: FormGroup;

  constructor(private fb: FormBuilder, private bikeService: BikeStoreService, private location: Location) {}

  ngOnInit(): void {
    this.bikeForm = this.fb.group({
      modelName: ['', Validators.required],
      modelYear: [null],
      engineCc: [null],
      manufacturer: ['']
    });
  }

  onSubmit(): void {
    if (this.bikeForm.valid) {
      this.bikeService.addBike(this.bikeForm.value).subscribe(() => {
        alert('Bike added successfully!');
        this.bikeForm.reset();
      });
    }
  }
  goBack(): void {
    this.location.back();
  }
}
