import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'r-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeTo(val: string) {
    this.router.navigateByUrl(val);
  }

  links = [
    {
      icon: "user",
      text: "Setting",
      link: "/settings"
    },
    // {
    //   icon: "user",
    //   text: "Log out",
    //   link: "/logout"
    // },
    {
      icon: "dollar sign",
      text: "Transaction",
      link: "/transaction"
    },
    {
      icon: "chart area",
      text: "Analytics",
      link: "/analytics"
    }
  ];



}
