import { Component, OnInit } from '@angular/core';
import { BikeStoreService } from '../../services/bikestore';
import { BikeStore } from '../../models/bike-store';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bike-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './bike-list.html',
  styleUrls: ['./bike-list.css']
})
export class BikeList implements OnInit {
  bikes: BikeStore[] = [];
  loading = true;
  error = '';

  constructor(private bikeService: BikeStoreService, private location: Location) {}

  ngOnInit(): void {
    this.fetchBikes();
  }

  fetchBikes(): void {
    this.loading = true;
    this.error = '';

    this.bikeService.getAllBikes().subscribe({
      next: data => {
        this.bikes = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading bikes', err);
        this.error = 'Failed to load bikes.';
        this.loading = false;
      }
    });
  }

  deleteBike(id: number): void {
    if (confirm('Are you sure you want to delete this bike?')) {
      this.bikeService.deleteBike(id).subscribe({
        next: () => {
          this.fetchBikes();
        },
        error: (err) => {
          console.error('Error deleting bike', err);
          alert('Failed to delete bike.');
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}

// import { Component, OnInit } from '@angular/core';
// import { BikeStoreService } from '../../services/bikestore';
// import { BikeStore } from '../../models/bike-store';
// import { CommonModule, CurrencyPipe } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { catchError } from 'rxjs';

// @Component({
//   selector: 'app-bike-list',
//   imports:[CurrencyPipe, RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
//   templateUrl: './bike-list.html',
//   styleUrls: ['./bike-list.css']
// })
// export class BikeList implements OnInit {
//   bikes: BikeStore[] = [];
//   loading = true;

//   constructor(private bikeService: BikeStoreService) {}

//   ngOnInit(): void {
//     this.loadBikes();
//   }

//   loadBikes(): void {
//     this.bikeService.getAllBikes().subscribe({
//       next: data => this.bikes = data,
//       error: err => console.error('Error loading bikes', err)
//     });
//     /* this.bikeService.getAllBikes().pipe(catchError((err) => {
//       console.log(err);
//       throw err;
//     })).subscribe((myData) => 
//     {
//       this.bikes = myData;
//     }) */
//   }

//   deleteBike(id: number): void {
//     if (confirm('Are you sure you want to delete this bike?')) {
//       this.bikeService.deleteBike(id).subscribe(() => {
//         this.bikes = this.bikes.filter(b => b.bikeId !== id);
//       });
//     }
//   }
// }
