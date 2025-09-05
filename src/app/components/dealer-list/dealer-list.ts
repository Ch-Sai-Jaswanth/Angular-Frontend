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
  role: 'admin' | 'producer' | 'dealer' | 'user' = 'user';
  getUserRole(): 'admin' | 'producer' | 'dealer' | 'user' {
    const role = localStorage.getItem('role')?.toLowerCase();
    const validRoles = ['admin', 'producer', 'dealer', 'user'];
    return validRoles.includes(role!) ? (role as any) : 'user';
  }

  dealers: Dealer[] = [];
  loading = true;
  error = '';

  constructor(private dealerService: DealerService, private location: Location) {}

  ngOnInit(): void {
    this.role = this.getUserRole();
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

  searchTerm = '';
  sortColumn: keyof Dealer | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  pageSize = 10;
  pageSizes = [5, 10, 20, 50];
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.filteredDealersWithoutPaging.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  get filteredDealersWithoutPaging(): Dealer[] {
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

  get filteredDealers(): Dealer[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDealersWithoutPaging.slice(start, start + this.pageSize);
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

  sort(column: keyof Dealer): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  canEdit(): boolean {
    return this.role === 'admin' || this.role === 'dealer';
  }

  canDelete(): boolean {
    return this.role === 'admin';
  }
}

// get filteredDealers(): Dealer[] {
//     let filtered = this.dealers.filter(dealer =>
//       dealer.dealerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       dealer.city?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       dealer.state?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       dealer.zipCode?.toString().includes(this.searchTerm) ||
//       dealer.storageCapacity?.toString().includes(this.searchTerm) ||
//       dealer.inventory?.toString().includes(this.searchTerm)
//     );

//     if (this.sortColumn) {
//       filtered = filtered.sort((a, b) => {
//         const valA = a[this.sortColumn!] ?? '';
//         const valB = b[this.sortColumn!] ?? '';
//         return this.sortDirection === 'asc'
//           ? valA > valB ? 1 : -1
//           : valA < valB ? 1 : -1;
//       });
//     }

//     return filtered;
//   }