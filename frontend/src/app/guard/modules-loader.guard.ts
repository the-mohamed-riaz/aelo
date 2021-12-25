import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getTokenParams } from './activator.guard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulesLoaderGuard implements CanLoad {
  constructor(private http: HttpClient, private cookie: CookieService, private route: Router) { }

  response: boolean | string | any = false;

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.http.get(environment.apiUrl + 'verify-token/', { params: getTokenParams(this.cookie.get('username'), this.cookie.get('tkn')) }).subscribe(
      (next) => {
        this.response = true;
        console.log("From modules loader:\n", "segments: ", segments, "route :", route);
      },
      (err) => {
        this.response = false;
      }
    )
    return this.response;
  }
}
