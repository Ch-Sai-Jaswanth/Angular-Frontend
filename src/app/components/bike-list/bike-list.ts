import { Component, OnInit } from '@angular/core';
import { BikeStoreService } from '../../services/bikestore';
import { BikeStore } from '../../models/bike-store';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bike-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './bike-list.html',
  styleUrls: ['./bike-list.css']
})
export class BikeList implements OnInit {
  role: 'admin' | 'producer' | 'dealer' | 'user' = 'user';

  getUserRole(): 'admin' | 'producer' | 'dealer' | 'user' {
    const role = localStorage.getItem('role')?.toLowerCase();
    const validRoles = ['admin', 'producer', 'dealer', 'user'];
    return validRoles.includes(role!) ? (role as any) : 'user';
  }

  pageSize = 10;
  pageSizes = [5, 10, 20, 50];
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.filteredBikes.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedBikes(): BikeStore[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredBikes.slice(start, start + this.pageSize);
  }


  bikes: BikeStore[] = [];
  loading = true;
  error = '';

  constructor(private bikeService: BikeStoreService, private location: Location) {}
  ngOnInit(): void {
    this.role = this.getUserRole();
    this.fetchBikes();
  }

  fetchBikes(): void {
    this.loading = true;
    this.error = '';

    this.bikeService.getAllBikes().subscribe({
      next: data => {
        this.bikes = data;
        this.loading = false;
        this.updateFilteredBikes(true);
      },
      error: err => {
        console.error('Error loading bikes', err);
        this.error = 'Failed to load bikes.';
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.updateFilteredBikes(true);
  }

  sort(column: keyof BikeStore): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updateFilteredBikes();
  }

  deleteBike(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this bike?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bikeService.deleteBike(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Bike deleted successfully',
              timer: 2000,
              showConfirmButton: false
            });
            this.fetchBikes();
          },
          error: (err) => {
            console.error('Error deleting bike', err);
            Swal.fire({
              icon: 'error',
              title: 'Delete Failed',
              text: 'This bike could not be deleted. Please check for related records or try again later.',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }

  // deleteBike(id: number): void {
  //   if (confirm('Are you sure you want to delete this bike?')) {
  //     this.bikeService.deleteBike(id).subscribe({
  //       next: () => {
  //         Swal.fire('Success!', 'Bike deleted successfully', 'success');
  //         this.fetchBikes();
  //       },
  //       error: (err) => {
  //         console.error('Error deleting bike', err);
  //         Swal.fire('Oops!', 'Failed to delete bike', 'error');
  //       }
  //     });
  //   }
  // }

  canEdit(): boolean {
    return this.role === 'admin' || this.role === 'producer';
  }

  canDelete(): boolean {
    return this.role === 'admin';
  }

  goBack(): void {
    this.location.back();
  }
  searchTerm = '';
  sortColumn: keyof BikeStore | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  filteredBikes: BikeStore[] = [];

  updateFilteredBikes(resetPage = false): void {
    let filtered = this.bikes.filter(bike =>
      bike.bikeId.toString().includes(this.searchTerm.toLowerCase()) ||
      bike.modelName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bike.manufacturer?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bike.modelYear?.toString().includes(this.searchTerm) ||
      bike.engineCc?.toString().includes(this.searchTerm)
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

    this.filteredBikes = filtered;

    if (resetPage) {
      this.changePage(1);
    }
  }
}

// ngOnInit(): void {
//   this.role = this.getUserRole();
//   this.fetchBikes();
// }

// fetchBikes(): void {
//   this.loading = true;
//   this.error = '';

//   this.bikeService.getAllBikes().subscribe({
//     next: data => {
//       this.bikes = data;
//       this.loading = false;
//     },
//     error: err => {
//       console.error('Error loading bikes', err);
//       this.error = 'Failed to load bikes.';
//       this.loading = false;
//     }
//   });
// }
// updateFilteredBikes(): void {
//   let filtered = this.bikes.filter(bike =>
//     bike.modelName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//     bike.manufacturer?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//     bike.modelYear?.toString().includes(this.searchTerm) ||
//     bike.engineCc?.toString().includes(this.searchTerm)
//   );

//   if (this.sortColumn) {
//     filtered = filtered.sort((a, b) => {
//       const valA = a[this.sortColumn!] ?? '';
//       const valB = b[this.sortColumn!] ?? '';
//       return this.sortDirection === 'asc'
//         ? valA > valB ? 1 : -1
//         : valA < valB ? 1 : -1;
//     });
//   }

//   this.filteredBikes = filtered;
//   this.changePage(1);
// }

// get filteredBikes(): BikeStore[] {
//   let filtered = this.bikes.filter(bike =>
//     bike.modelName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//     bike.manufacturer?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//     bike.modelYear?.toString().includes(this.searchTerm) ||
//     bike.engineCc?.toString().includes(this.searchTerm)
//   );

//   if (this.sortColumn) {
//     filtered = filtered.sort((a, b) => {
//       const valA = a[this.sortColumn!] ?? '';
//       const valB = b[this.sortColumn!] ?? '';
//       return this.sortDirection === 'asc'
//         ? valA > valB ? 1 : -1
//         : valA < valB ? 1 : -1;
//     });
//   }
//   return filtered;
// }

// sort(column: keyof BikeStore): void {
//   if (this.sortColumn === column) {
//     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//   } else {
//     this.sortColumn = column;
//     this.sortDirection = 'asc';
//   }
// }