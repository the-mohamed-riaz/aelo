import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card1x',
  templateUrl: './card1x.component.html',
  styleUrls: ['./card1x.component.scss']
})
export class Card1xComponent implements OnInit {
  @Input() data = {
    title: "",
    content: "",
    icon:""
  }
  constructor() { }

  ngOnInit(): void {
  }

}
