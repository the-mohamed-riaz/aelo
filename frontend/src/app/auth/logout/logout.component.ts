import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private cookie: CookieService, private route: Router) {
    if (this.cookie.check('tkn')) {
      this.cookie.delete('tkn');
      this.cookie.delete('user');
    };
    setTimeout(() => this.route.navigateByUrl('/login'), 2500);
  }

  ngOnInit(): void {
  }

}
