import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealerService } from '../../services/dealer';

@Component({
  selector: 'app-dealer-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './dealer-form.html',
  styleUrl: './dealer-form.css'
})
export class DealerForm implements OnInit {
  dealerForm!: FormGroup;

  constructor(private fb: FormBuilder, private dealerService: DealerService, private location: Location) {}

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
      this.dealerService.addDealer(this.dealerForm.value).subscribe(() => {
        alert('Dealer added successfully!');
        this.dealerForm.reset();
      });
    }
  }
  goBack(): void {
    this.location.back();
  }
}
