import { Component, OnInit } from '@angular/core';
import { DealerMasterService } from '../../services/dealermaster-service';
import { DealerMaster } from '../../models/dealer-master';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BikeStoreService } from '../../services/bikestore';
import { BikeStore } from '../../models/bike-store';

@Component({
  selector: 'app-dealermaster-list',
  imports: [DatePipe, CommonModule, RouterLink, FormsModule],
  templateUrl: './dealermaster-list.html',
  styleUrls: ['./dealermaster-list.css']
})
export class DealerMasterList implements OnInit {
  dealerMasters: DealerMaster[] = [];
  loading = true;
  error = '';
  constructor(private dealerMasterService: DealerMasterService, private location: Location, private bikeService: BikeStoreService) {}

  role: 'admin' | 'producer' | 'dealer' | 'user' = 'user';

  currentPage = 1;
  recordsPerPage = 10;
  pageSizes = [5, 10, 20, 50];
  searchTerm = '';
  sortColumn: keyof DealerMaster | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.role = this.getUserRole();
    this.fetchDealerMasters();
    this.fetchBikes();
  }

  getUserRole(): 'admin' | 'producer' | 'dealer' | 'user' {
    const role = localStorage.getItem('role')?.toLowerCase();
    const validRoles = ['admin', 'producer', 'dealer', 'user'];
    return validRoles.includes(role!) ? (role as any) : 'user';
  }

  fetchDealerMasters(): void {
    this.dealerMasterService.getAllDealerMasters().subscribe({
      next: data => {
        this.dealerMasters = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load delivery records.';
        this.loading = false;
      }
    });
  }

  bikes: BikeStore[] = [];
  bikeMap: { [key: number]: string } = {};

  fetchBikes(): void {
    this.bikeService.getAllBikes().subscribe({
      next: data => {
        this.bikes = data;
        this.bikeMap = Object.fromEntries(data.map(b => [b.bikeId, b.modelName]));
      },
      error: err => console.error('Failed to load bikes', err)
    });
  }

  getModelName(bikeId: number): string {
    return this.bikeMap[bikeId] ?? 'Unknown';
  }

  deleteRecord(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this dealer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dealerMasterService.deleteDealerMaster(id).subscribe(() => {
          this.dealerMasters = this.dealerMasters.filter(d => d.dealerMasterId !== id);

          Swal.fire({
            title: 'Deleted!',
            text: 'The dealerMaster has been removed.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        });
      }
    });
    // if (confirm('Are you sure you want to delete this delivery record?')) {
    //   this.dealerMasterService.deleteDealerMaster(id).subscribe({
    //     next: () => this.fetchDealerMasters(),
    //     error: (err) => {
    //     console.error(err);
    //     alert('Failed to delete record.');
    //   }
    //   });
    // }
  }

  goBack(): void {
    this.location.back();
  }

  get filteredDealerMasters(): DealerMaster[] {
  let filtered = this.dealerMasters;

  if (this.searchTerm) {
    const lowerTerm = this.searchTerm.toLowerCase();
    filtered = filtered.filter(record =>
      record.dealerMasterId.toString().toLowerCase().includes(lowerTerm) ||
      record.dealerId.toString().toLowerCase().includes(lowerTerm) ||
      // record.bikeId.toString().toLowerCase().includes(lowerTerm) ||
      this.getModelName(record.bikeId).toLowerCase().includes(lowerTerm) ||
      record.bikesDelivered?.toString().toLowerCase().includes(lowerTerm) ||
      record.deliveryDate?.toLowerCase().includes(lowerTerm)
    );
  }

  if (this.sortColumn) {
    filtered = [...filtered].sort((a, b) => {
      const valA = a[this.sortColumn!] ?? '';
      const valB = b[this.sortColumn!] ?? '';
      return this.sortDirection === 'asc'
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
  }

    return filtered;
  }
  
  get paginatedDealerMasters(): DealerMaster[] {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    return this.filteredDealerMasters.slice(startIndex, startIndex + this.recordsPerPage);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredDealerMasters.length / this.recordsPerPage));
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  changePageSize(size: number): void {
    this.recordsPerPage = size;
    this.currentPage = 1;
  }


  sort(column: keyof DealerMaster): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  canEdit(): boolean {
    return this.role === 'admin';
  }

  canDelete(): boolean {
    return this.role === 'admin';
  }
}

// get filteredDealerMasters(): DealerMaster[] {
//     let filtered = this.dealerMasters.filter(record =>
//       record.dealerId.toString().includes(this.searchTerm.toLowerCase()) ||
//       record.bikeId.toString().includes(this.searchTerm.toLowerCase()) ||
//       record.bikesDelivered?.toString().includes(this.searchTerm.toLowerCase()) ||
//       record.deliveryDate?.toLowerCase().includes(this.searchTerm.toLowerCase())
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