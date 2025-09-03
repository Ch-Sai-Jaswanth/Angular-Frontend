import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealerService } from '../../services/dealer';
import { Router } from '@angular/router';

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
      dealerId: ['', Validators.required],
      dealerName: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [null],
      storageCapacity: [0, Validators.required],
      inventory: [null]
    });
  }

  onSubmit(): void {
    if (this.dealerForm.valid) {
      const role = localStorage.getItem('role');
      if (role === 'Admin' || role === 'Dealer') {
        this.dealerService.addDealer(this.dealerForm.value).subscribe(() => {
        alert('Dealer added successfully!');
        this.dealerForm.reset();
        this.router.navigate(['/dealers']);
      });
    }
    else
    {
      alert("You are not allowed to perform this action");
      this.dealerForm.reset();
    }
  }
  }
  goBack(): void {
    this.location.back();
  }
}
