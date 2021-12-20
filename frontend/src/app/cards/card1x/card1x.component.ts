import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FormDataGeneratorService } from 'src/app/shared/form-data-generator.service';
import { ApiService } from './../serivce/api.service';

export interface bank_api_resp {
  account_balance: number;
  bank_name: string;
  timestamp: string;
  username: string;
}

export interface number_metrics_resp {
  income: number;
  expense: number;
}


@Component({
  selector: 'card1x',
  templateUrl: './card1x.component.html',
  styleUrls: ['./card1x.component.scss']
})
export class Card1xComponent implements OnInit {

  provided_bk_details = false;
  username: string;

  cash_in_flow!: number;
  cash_out_flow!: number;
  bank_balance: number | null | string = null;

  month: string;
  months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  constructor(private http: HttpClient, private cookie: CookieService, private api: ApiService, private generator: FormDataGeneratorService) {
    this.username = this.cookie.get('username');
    this.bank_form.controls['username'].setValue(this.username);
    this.month = this.months_arr[new Date().getMonth()];
    this.get_bk_details();
  }

  get_number_metrics() {
    this.api.get_number_metrics().subscribe(
      (val) => {
        this.cash_in_flow = val.income;
        this.cash_out_flow = val.expense;
        console.debug("number metrics\n,", this.cash_in_flow, this.cash_out_flow, "\n val: ", val);
      }
    )
  };


  get_bk_details() {
    this.api.get_bk_details().subscribe(
      (val: bank_api_resp) => {
        console.debug("val from bank details api", val);
        val ? this.provided_bk_details = true : this.provided_bk_details = false;
        if (this.provided_bk_details) {
          this.bank_balance = val.account_balance.toLocaleString();
          this.get_number_metrics();
        }
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
    // setInterval(() => this.get_bk_details(), 3000);
  }

  submitForm() {
    let form_data = this.generator.generateFormData(['username', 'bank_name', 'account_balance'], this.bank_form);
    this.http.post('http://localhost:8000/account-balance/', form_data).subscribe(
      () => {
        this.get_bk_details();
        console.log("-------- sending bank details ----------");
      },
      (err) => {
        console.log("cannot send data, ", err);
      }
    )
  }
}
