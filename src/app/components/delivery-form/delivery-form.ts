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
  dealers: any[] = [];
  bikes: any[] = [];

  constructor(private fb: FormBuilder, private deliveryService: DealerMasterService, private location:Location, private router: Router) {}

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      dealerMasterId: [null, Validators.required],
      dealerId: [null, Validators.required],
      bikeId: [null, Validators.required],
      bikesDelivered: [null],
      deliveryDate: [null]
    });
    this.loadDealers();
    this.loadBikes();
  }

  loadDealers(): void {
    this.deliveryService.getAllDealers().subscribe(data => {
      this.dealers = data;
    });
  }

  loadBikes(): void {
    this.deliveryService.getAllBikes().subscribe(data => {
      this.bikes = data;
    });
  }
  onSubmit(): void {
    if (this.deliveryForm.valid) {
      const role = localStorage.getItem('role');
      if (role === 'Admin') {
      this.deliveryService.addDealerMaster(this.deliveryForm.value).subscribe(() => {
        alert('Delivery record added!');
        this.deliveryForm.reset();
        this.router.navigate(['/deliveries']);
      });
    }
    else
    {
      alert("You are not allowed to perform this action");
      this.deliveryForm.reset();
    }
  }
  }
  goBack(): void {
    this.location.back();
  }
}
