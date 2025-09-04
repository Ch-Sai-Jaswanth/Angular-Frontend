import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../services/dealer';
import { Dealer } from '../../models/dealer';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dealer-list',
  imports:[RouterLink, CommonModule, FormsModule],
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

  searchTerm = '';
  sortColumn: keyof Dealer | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  get filteredDealers(): Dealer[] {
    let filtered = this.dealers.filter(dealer =>
      dealer.dealerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dealer.city?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dealer.state?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dealer.zipCode?.toString().includes(this.searchTerm) ||
      dealer.storageCapacity?.toString().includes(this.searchTerm) ||
      dealer.inventory?.toString().includes(this.searchTerm)
    );

    if (this.sortColumn) {
      filtered = filtered.sort((a, b) => {
        const valA = a[this.sortColumn!] ?? '';
        const valB = b[this.sortColumn!] ?? '';
        return this.sortDirection === 'asc'
          ? valA > valB ? 1 : -1
          : valA < valB ? 1 : -1;
      });
    }

    return filtered;
  }

  sort(column: keyof Dealer): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

}
