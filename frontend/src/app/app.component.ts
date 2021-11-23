import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AELO';

  constructor(private route: Router) { }

  loggedin: boolean = false;

  currentUrl: string | null = null;

  checkStatus() {
    this.route.events.subscribe(
      (event) => {
        (event instanceof NavigationEnd) ? this.currentUrl = event.url : null;
      }
    );
    return this.currentUrl;
  }
}
