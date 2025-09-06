import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DealerService } from '../../services/dealer';
import { Dealer } from '../../models/dealer';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dealer',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-dealer.html',
  styleUrl: './edit-dealer.css'
})
export class EditDealer {
  dealerForm!: FormGroup;
  dealerId!: number;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private dealerService: DealerService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dealerId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadDealer();
  }

  initForm(): void {
    this.dealerForm = this.fb.group({
      dealerName: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [null],
      storageCapacity: [0, [Validators.required, Validators.min(0)]],
      inventory: [0]
    });
  }
  loadDealer(): void {
    this.dealerService.getDealerById(this.dealerId).subscribe({
      next: (dealer: Dealer) => {
        this.dealerForm.patchValue(dealer);
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading dealer:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.dealerForm.invalid) return;

    const updatedDealer: Dealer = {
      dealerId: this.dealerId,
      ...this.dealerForm.value
    };

    this.dealerService.updateDealer(this.dealerId, updatedDealer).subscribe({
      next: () => {
        Swal.fire('Success!', 'Dealer updated successfully', 'success');
        this.router.navigate(['/dealers'])
      },
      error: err => console.error('Update failed:', err)
    });
  }

  goBack(): void {
    this.location.back();
  }
}
