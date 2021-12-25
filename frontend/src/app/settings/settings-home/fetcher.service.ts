import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
        return this.http.get<$profile_details>(environment.apiUrl + "settings-page/");
    };
    update_profile_data(formData: FormData): Observable<$profile_details> {
        return this.http.patch<$profile_details>(environment.apiUrl + "settings-page/", formData);
    };

    change_password(): Observable<Array<any>> {
        return this.http.get<Array<any>>(environment.apiUrl + "trans-chart/");
    };
}
