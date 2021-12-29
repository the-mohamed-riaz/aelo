import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivatorGuard implements CanActivate {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  respone: boolean | string | any = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.http.get(environment.apiUrl + 'verify-token/', { params: getTokenParams(this.cookie.get('username'), this.cookie.get('tkn')) }).subscribe(
      (next) => {
        // console.log("can activate gaurd status:", next);
        this.respone = true;
      },
      (err) => {
        this.respone = false;
      }
    );
    return this.respone;
  }

}

export function getTokenParams(username: string, token: string): HttpParams {
  let params: HttpParams | null = null;
  params = new HttpParams().set('username', username ? username : '',).append('token', token ? token : '');
  return params;
}