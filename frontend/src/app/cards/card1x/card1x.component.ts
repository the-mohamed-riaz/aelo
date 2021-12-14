import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'card1x',
  templateUrl: './card1x.component.html',
  styleUrls: ['./card1x.component.scss']
})
export class Card1xComponent implements OnInit {

  provided_bk_details = false;
  username: string;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.username = this.cookie.get('username');
    this.bank_form.controls['username'].setValue(this.username);
    this.http.get(`http://localhost:8000/bank-details/?username=${this.username}`).subscribe(
      val => {
        console.debug("val from bank details api", val);
        val ? this.provided_bk_details = true : this.provided_bk_details = false;
      },
      err => {
        console.debug("error from bank api", err);
        this.provided_bk_details = false;
      }
    );
  }


  bank_form = new FormGroup({
    username: new FormControl(null),
    bank_name: new FormControl(null),
    account_balance: new FormControl(null)
  })

  ngOnInit(): void {
  }

  submitForm() {
    // this.http.post()
  }
}
