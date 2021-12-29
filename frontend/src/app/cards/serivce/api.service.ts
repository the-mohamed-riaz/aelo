import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bank_api_resp, number_metrics_resp } from '../card1x/card1x.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) { }

  get_number_metrics(): Observable<number_metrics_resp> {
    return this.http.get<number_metrics_resp>(environment.apiUrl + 'number-metrics/')
  }

  get_bk_details(): Observable<bank_api_resp> {
    return this.http.get<bank_api_resp>(environment.apiUrl + 'account-balance/')
  }

  send_bank_details(form_data: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + 'account-balance/', form_data)
  }
}
