import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealerMasterService } from '../../services/dealermaster-service';
import { DealerMaster } from '../../models/dealer-master';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-dealermaster-details',
  imports: [CommonModule],
  templateUrl: './dealermaster-details.html',
  styleUrl: './dealermaster-details.css'
})
export class DealermasterDetails {
  delivery: DealerMaster | null = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private deliveryService: DealerMasterService, private location: Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deliveryService.getDealerMasterById(id).subscribe({
      next: data => {
        this.delivery = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load delivery details.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
