import { Component, OnInit } from '@angular/core';
import { DealerMasterService } from '../../services/dealermaster-service';
import { DealerMaster } from '../../models/dealer-master';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  role: 'admin' | 'producer' | 'dealer' | 'user' = 'user';

  getUserRole(): 'admin' | 'producer' | 'dealer' | 'user' {
    const role = localStorage.getItem('role')?.toLowerCase();
    const validRoles = ['admin', 'producer', 'dealer', 'user'];
    return validRoles.includes(role!) ? (role as any) : 'user';
  }

  constructor(private dealerMasterService: DealerMasterService, private location: Location) {}

  ngOnInit(): void {
    this.role = this.getUserRole();
    this.fetchDealerMasters();
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

  deleteRecord(id: number): void {
    if (confirm('Are you sure you want to delete this delivery record?')) {
      this.dealerMasterService.deleteDealerMaster(id).subscribe({
        next: () => this.fetchDealerMasters(),
        error: (err) => {
        console.error(err);
        alert('Failed to delete record.');
      }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  searchTerm = '';
  sortColumn: keyof DealerMaster | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  get filteredDealerMasters(): DealerMaster[] {
    let filtered = this.dealerMasters.filter(record =>
      record.dealerId.toString().includes(this.searchTerm.toLowerCase()) ||
      record.bikeId.toString().includes(this.searchTerm.toLowerCase()) ||
      record.bikesDelivered?.toString().includes(this.searchTerm.toLowerCase()) ||
      record.deliveryDate?.toLowerCase().includes(this.searchTerm.toLowerCase())
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
