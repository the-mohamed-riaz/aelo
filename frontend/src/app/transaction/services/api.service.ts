import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $recentTransaction } from '../models/model';
import { environment } from 'src/environments/environment';
import { $TableElement } from 'src/app/shared/components/mat-table/mat-table.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get_recent_transaction(): Observable<Array<$recentTransaction>> {
    return this.http.get<Array<$recentTransaction>>(environment.apiUrl + 'recent/');
  }

  get_cat_options(): Observable<string> {
    return this.http.get<string>(environment.apiUrl + 'options/');
  }

  patch_cat_options(user: string, option: string) {
    this.http.patch(environment.apiUrl + 'options/', { username: user, cat_options: option }).subscribe(
      (val) => console.log("success patching request ....\n", val),
      (err) => console.log("Error patching request ....\n", err)
    );
  }

  add_transaction(formData: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + "add/", formData);
  }

  get_history_of_all_trans() {
    return this.http.get<Array<$TableElement>>(environment.apiUrl + 'history/')
  }
}
