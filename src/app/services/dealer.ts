import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dealer } from '../models/dealer';

@Injectable({ providedIn: 'root' })

export class DealerService {
  private apiUrl = 'https://localhost:7188/api/dealer';

  constructor(private http: HttpClient) {}

  getAllDealers(): Observable<Dealer[]> {
    return this.http.get<Dealer[]>(this.apiUrl);
  }

  deleteDealer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDealerById(id: number): Observable<Dealer> {
    return this.http.get<Dealer>(`${this.apiUrl}/${id}`);
  }

  updateDealer(id: number, dealer: Dealer): Observable<Dealer> {
    return this.http.put<Dealer>(`${this.apiUrl}/${id}`, dealer);
  }

  addDealer(dealer: Dealer): Observable<Dealer> {
    return this.http.post<Dealer>(this.apiUrl, dealer);
  }

  checkDealerExists(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${id}`);
  }

  addDealersBulk(dealers: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, dealers);
  }
}
