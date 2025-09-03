import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealerMasterService } from '../../services/dealermaster-service';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './delivery-form.html',
  styleUrl: './delivery-form.css'
})
export class DeliveryForm implements OnInit {
  deliveryForm!: FormGroup;

  constructor(private fb: FormBuilder, private deliveryService: DealerMasterService, private location:Location, private router: Router) {}

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      dealerMasterId: [null, Validators.required],
      dealerId: [null, Validators.required],
      bikeId: [null, Validators.required],
      bikesDelivered: [null],
      deliveryDate: [null]
    });
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      this.deliveryService.addDealerMaster(this.deliveryForm.value).subscribe(() => {
        alert('Delivery record added!');
        this.deliveryForm.reset();
        this.router.navigate(['/deliveries']);
      });
    }
  }
  goBack(): void {
    this.location.back();
  }
}
