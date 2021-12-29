import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { export_form_data } from '../login/login.component';

export interface $login_resp {
  token: string;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) {
    // console.log("Backend service url: ", environment.apiUrl);
  }

  registerUser(form: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'register/', export_form_data(form));
  }

  loginUser(form: any): Observable<$login_resp> {
    return this.http.post<$login_resp>(environment.apiUrl + 'login-token/', export_form_data(form));
  }
}

