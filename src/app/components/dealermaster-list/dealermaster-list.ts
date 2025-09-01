import { Component, OnInit } from '@angular/core';
import { DealerMasterService } from '../../services/dealermaster-service';
import { DealerMaster } from '../../models/dealer-master';
import { CommonModule, DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-dealermaster-list',
  imports: [DatePipe, CommonModule],
  templateUrl: './dealermaster-list.html',
  styleUrls: ['./dealermaster-list.css']
})
export class DealerMasterList implements OnInit {
  dealerMasters: DealerMaster[] = [];
  loading = true;
  error = '';

  constructor(private dealerMasterService: DealerMasterService, private location: Location) {}

  ngOnInit(): void {
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
}
