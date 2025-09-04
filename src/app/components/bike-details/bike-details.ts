import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeStoreService } from '../../services/bikestore';
import { BikeStore } from '../../models/bike-store';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-bike-details',
  imports: [CommonModule],
  templateUrl: './bike-details.html',
  styleUrl: './bike-details.css'
})
export class BikeDetails {
  bike: BikeStore | null = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private bikeService: BikeStoreService, private location:Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bikeService.getBikeById(id).subscribe({
      next: data => {
        this.bike = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load bike details.';
        this.loading = false;
      }
    });
  }

  goBack()
  {
    this.location.back();
  }
}
