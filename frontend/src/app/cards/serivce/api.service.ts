import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bank_api_resp, number_metrics_resp } from '../card1x/card1x.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get_number_metrics(): Observable<number_metrics_resp> {
    return this.http.get<number_metrics_resp>('http://localhost:8000/number-metrics/')
  }

  get_bk_details(): Observable<bank_api_resp> {
    return this.http.get<bank_api_resp>('http://localhost:8000/account-balance/')
  }
}
