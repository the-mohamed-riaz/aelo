import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { FormDataGeneratorService } from 'src/app/shared/form-data-generator.service';

export interface bank_api_resp {
  account_balance: number;
  bank_name: string;
  timestamp: string;
  username: string;
}

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

  bank_balance: number | null | string = null;

  constructor(private http: HttpClient, private cookie: CookieService, private generator: FormDataGeneratorService) {
    this.username = this.cookie.get('username');
    this.bank_form.controls['username'].setValue(this.username);
    this.get_bk_details();
  }

  get_bk_details() {
    this.http.get<bank_api_resp>(`http://localhost:8000/account-balance/?username=${this.username}`).subscribe(
      (val: bank_api_resp) => {
        console.debug("val from bank details api", val);
        val ? this.provided_bk_details = true : this.provided_bk_details = false;
        if (this.provided_bk_details) {
          this.bank_balance = val.account_balance.toLocaleString();
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
    setInterval(() => this.get_bk_details(), 3000);
  }

  submitForm() {
    let form_data = this.generator.generateFormData(['username', 'bank_name', 'account_balance'], this.bank_form);
    this.http.post('http://localhost:8000/account-balance/', form_data).subscribe(
      (val) => {
        this.get_bk_details();
      }
    )
  }
}
