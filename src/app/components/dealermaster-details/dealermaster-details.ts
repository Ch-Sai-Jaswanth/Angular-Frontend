import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealerMasterService } from '../../services/dealermaster-service';
import { DealerMaster } from '../../models/dealer-master';
import { CommonModule, Location } from '@angular/common';
import { DealerService } from '../../services/dealer';
import { BikeStoreService } from '../../services/bikestore';

@Component({
  selector: 'app-dealermaster-details',
  imports: [CommonModule],
  templateUrl: './dealermaster-details.html',
  styleUrl: './dealermaster-details.css'
})
export class DealermasterDetails {
  delivery: DealerMaster | null = null;
  dealerName = '';
  modelName = '';
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private deliveryService: DealerMasterService, private location: Location, private dealerService:DealerService, private bikeService: BikeStoreService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deliveryService.getDealerMasterById(id).subscribe({
      next: data => {
        this.delivery = data;
        this.fetchDealerName(data.dealerId);
        this.fetchModelName(data.bikeId);
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load delivery details.';
        this.loading = false;
      }
    });
  }

  fetchDealerName(dealerId: number): void {
    this.dealerService.getDealerById(dealerId).subscribe({
      next: dealer => this.dealerName = dealer.dealerName,
      error: () => this.dealerName = 'Unknown Dealer'
    });
  }

  fetchModelName(bikeId: number): void {
    this.bikeService.getBikeById(bikeId).subscribe({
      next: bike => this.modelName = bike.modelName,
      error: () => this.modelName = 'Unknown Model'
    });
  }

  goBack(): void {
    this.location.back();
  }
}
