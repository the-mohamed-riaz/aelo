import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $recentTransaction } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get_recent_transaction(): Observable<Array<$recentTransaction>> {
    return this.http.get<Array<$recentTransaction>>('http://localhost:8000/recent/');
  }

  get_cat_options(): Observable<string> {
    return this.http.get<string>('http://localhost:8000/options/');
  }

  patch_cat_options(user: string, option: string) {
    this.http.patch('http://localhost:8000/options/', { username: user, cat_options: option }).subscribe(
      (val) => console.log("success patching request ....\n", val),
      (err) => console.log("Error patching request ....\n", err)
    );
  }
}
