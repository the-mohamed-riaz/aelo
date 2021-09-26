import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-trans',
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.scss']
})
export class AddTransComponent implements OnInit {

  randId: string;
  constructor() {
    this.randId = 'id_' + this.gen_RandId();
  }

  ngOnInit(): void {
  }

  gen_RandId() {
    let id = Math.random() * 1000;
    return Math.round(id)
  }
  logThis(val: string) {
    console.log(val);
  }
}
