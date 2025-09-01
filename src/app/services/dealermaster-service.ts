import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DealerMaster } from '../models/dealer-master';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerMasterService {
  private apiUrl = 'https://localhost:7188/api/DM'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getAllDealerMasters(): Observable<DealerMaster[]> {
    return this.http.get<DealerMaster[]>(this.apiUrl);
  }

  addDealerMaster(payload: DealerMaster): Observable<DealerMaster> {
    return this.http.post<DealerMaster>(this.apiUrl, payload);
  }

  updateDealerMaster(id: number, payload: DealerMaster): Observable<DealerMaster> {
    return this.http.put<DealerMaster>(`${this.apiUrl}/${id}`, payload);
  }

  deleteDealerMaster(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
