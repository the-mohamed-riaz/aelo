import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface $tree_map {
  x: string;
  y: string;
};

export interface $trans_chart {
  timestamp: Date | string;
  account_balance: number;
}

@Injectable({
  providedIn: 'root'
})

export class FetcherService {

  constructor(private http: HttpClient) { }

  get_tree_map_data(): Observable<Array<$tree_map>> {
    return this.http.get<Array<$tree_map>>(environment.apiUrl + "tree-map/");
  }

  get_trans_time_series(): Observable<Array<$trans_chart>> {
    return this.http.get<Array<$trans_chart>>(environment.apiUrl + "trans-chart/");
  }
}
