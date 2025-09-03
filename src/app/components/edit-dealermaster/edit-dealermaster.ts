import { Component } from '@angular/core';
import { DealerMaster } from '../../models/dealer-master';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DealerMasterService } from '../../services/dealermaster-service';
import { CommonModule, Location } from '@angular/common';
import { DealerService } from '../../services/dealer';
import { BikeStoreService } from '../../services/bikestore';
import { BikeStore } from '../../models/bike-store';
import { Dealer } from '../../models/dealer';

@Component({
  selector: 'app-edit-dealermaster',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-dealermaster.html',
  styleUrl: './edit-dealermaster.css'
})
export class EditDealermaster {
  dealerMasterForm!: FormGroup;
  dealerMasterId!: number;
  isLoading = true;

  dealers: Dealer[] = [];
  bikes: BikeStore[] = [];

  constructor(
    private route: ActivatedRoute,
    private dealerMasterService: DealerMasterService,
    private dealerService: DealerService,
    private bikeService: BikeStoreService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dealerMasterId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadDealerMaster();
    this.loadDealers();
    this.loadBikes();
  }

  initForm(): void {
    this.dealerMasterForm = this.fb.group({
      dealerId: [null, Validators.required],
      bikeId: [null, Validators.required],
      bikesDelivered: [null],
      deliveryDate: [null]
    });
  }

  loadDealerMaster(): void {
    this.dealerMasterService.getDealerMasterById(this.dealerMasterId).subscribe({
      next: (record: DealerMaster) => {
        if (record.deliveryDate) {
        const date = new Date(record.deliveryDate);
        const formattedDate = date.toISOString().split('T')[0];
        record.deliveryDate = formattedDate;
      }
        this.dealerMasterForm.patchValue(record);
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading DealerMaster:', err);
        this.isLoading = false;
      }
    });
  }

  loadDealers(): void {
    this.dealerService.getAllDealers().subscribe({
      next: data => this.dealers = data,
      error: err => console.error('Failed to load dealers:', err)
    });
  }

  loadBikes(): void {
    this.bikeService.getAllBikes().subscribe({
      next: data => this.bikes = data,
      error: err => console.error('Failed to load bikes:', err)
    });
  }

  onSubmit(): void {
    if (this.dealerMasterForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    // const { dealerId, bikeId } = this.dealerMasterForm.value;

    // const dealerExists = this.dealers.some(d => d.dealerId === dealerId);
    // const bikeExists = this.bikes.some(b => b.bikeId === bikeId);

    // if (this.dealerMasterForm.invalid) return;

    const { dealerId, bikeId } = this.dealerMasterForm.value;
    
    // const updated: DealerMaster = {
    //   dealerMasterId: this.dealerMasterId,
    //   ...this.dealerMasterForm.value
    // };

    // this.dealerMasterService.updateDealerMaster(this.dealerMasterId, updated).subscribe({
    //   next: () => {
    //     alert("Dealermaster updated successfully");
    //     this.router.navigate(['/deliveries'])
    //   },
    //   error: err => console.error('Update failed:', err)
    // });

    const updated: DealerMaster = {
      dealerMasterId: this.dealerMasterId,
      ...this.dealerMasterForm.value
    };

    this.dealerMasterService.updateDealerMaster(this.dealerMasterId, updated).subscribe({
      next: () => {
        alert("DealerMaster updated successfully");
        this.router.navigate(['/deliveries']);
      },
      error: err => {
        console.error('Update failed:', err);
        alert('Something went wrong while updating. Please try again.');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}


// dealerMasterForm!: FormGroup;
//   dealerMasterId!: number;
//   isLoading = true;

//   constructor(
//     private route: ActivatedRoute,
//     private dealerMasterService: DealerMasterService,
//     private fb: FormBuilder,
//     private router: Router,
//     private location: Location
//   ) {}

//   ngOnInit(): void {
//     this.dealerMasterId = +this.route.snapshot.paramMap.get('id')!;
//     this.initForm();
//     this.loadDealerMaster();
//   }

//   initForm(): void {
//     this.dealerMasterForm = this.fb.group({
//       dealerId: [null, Validators.required],
//       bikeId: [null, Validators.required],
//       bikesDelivered: [null],
//       deliveryDate: [null]
//     });
//   }

//   loadDealerMaster(): void {
//     this.dealerMasterService.getAllDealerMasters().subscribe({
//       next: (data: DealerMaster[]) => {
//         const record = data.find(dm => dm.dealerMasterId === this.dealerMasterId);
//         if (record) {
//           this.dealerMasterForm.patchValue(record);
//         }
//         this.isLoading = false;
//       },
//       error: err => {
//         console.error('Error loading DealerMaster:', err);
//         this.isLoading = false;
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.dealerMasterForm.invalid) return;

//     const { dealerId, bikeId } = this.dealerMasterForm.value;
    
//     const updated: DealerMaster = {
//       dealerMasterId: this.dealerMasterId,
//       ...this.dealerMasterForm.value
//     };

//     this.dealerMasterService.updateDealerMaster(this.dealerMasterId, updated).subscribe({
//       next: () => {
//         alert("Dealermaster updated successfully");
//         this.router.navigate(['/deliveries'])
//       },
//       error: err => console.error('Update failed:', err)
//     });
//   }

//   goBack(): void {
//     this.location.back();
//   }