import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface $profile_details {
    email: string;
    mobile: number;
    full_name: string;
};


@Injectable({
    providedIn: 'root'
})

export class FetcherService {

    constructor(private http: HttpClient) { }

    get_profile_data(): Observable<$profile_details> {
        return this.http.get<$profile_details>("http://localhost:8000/settings-page/");
    };

    change_password(): Observable<Array<any>> {
        return this.http.get<Array<any>>("http://localhost:8000/trans-chart/");
    };
}
