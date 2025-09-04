import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealerService } from '../../services/dealer';
import { Dealer } from '../../models/dealer';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-dealer-details',
  imports: [CommonModule],
  templateUrl: './dealer-details.html',
  styleUrl: './dealer-details.css'
})
export class DealerDetails {
  dealer: Dealer | null = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private dealerService: DealerService, private location:Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dealerService.getDealerById(id).subscribe({
      next: data => {
        this.dealer = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load dealer details.';
        this.loading = false;
      }
    });
  }

  goBack()
  {
    this.location.back();
  }
}
