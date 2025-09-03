import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BikeStore } from '../models/bike-store';
@Injectable({
  providedIn: 'root'
})
export class BikeStoreService {
  private apiUrl = 'https://localhost:7188/api/BikeStore'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getAllBikes(): Observable<BikeStore[]> {
    return this.http.get<BikeStore[]>(this.apiUrl);
  }

  getBikeById(id: number): Observable<BikeStore> {
    return this.http.get<BikeStore>(`${this.apiUrl}/${id}`);
  }

  // addBike(bike: BikeStore): Observable<BikeStore> {
  //   return this.http.post<BikeStore>(this.apiUrl, bike);
  // }
  addBike(bike: BikeStore): Observable<BikeStore> {
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return this.http.post<BikeStore>(this.apiUrl, bike, { headers });
}

  updateBike(id: number, bike: BikeStore): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, bike);
  }

  // deleteBike(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
  deleteBike(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
}

}

// export class BikeService {
//   private apiUrl = 'https://localhost:5001/api/bikes'; // Adjust as needed

//   constructor(private http: HttpClient) {}

//   getAllBikes(): Observable<BikeStore[]> {
//     return this.http.get<BikeStore[]>(this.apiUrl);
//   }
// }
