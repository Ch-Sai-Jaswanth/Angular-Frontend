import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../services/dealer';
import { Dealer } from '../../models/dealer';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-dealer-list',
  imports:[RouterLink, CommonModule],
  templateUrl: './dealer-list.html',
  styleUrls: ['./dealer-list.css']
})
export class DealerList implements OnInit {
  dealers: Dealer[] = [];
  loading = true;
  error = '';

  constructor(private dealerService: DealerService, private location: Location) {}

  ngOnInit(): void {
    this.loadDealers();
  }

  loadDealers(): void {
    // this.dealerService.getAllDealers().subscribe({
    //   next: data => this.dealers = data,
    //   error: err => console.error('Error loading dealers', err)
    // });
    this.dealerService.getAllDealers().subscribe({
      next: data => {
        this.dealers = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load delivery records.';
        this.loading = false;
      }
    })
  }

  deleteDealer(id: number): void {
    if (confirm('Are you sure you want to delete this dealer?')) {
      this.dealerService.deleteDealer(id).subscribe(() => {
        this.dealers = this.dealers.filter(d => d.dealerId !== id);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
