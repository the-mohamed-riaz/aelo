import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  links = [
    {
      icon: "dollar sign",
      text:"Transaction",
      link:"/transaction"
    },
    {
      icon: "chart area",
      text: "Analytics",
      link:"/analytics"
    }
  ]

}
