import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-trans',
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.scss']
})
export class AddTransComponent implements OnInit {

  randId: string;
  customDate = true;
  constructor(private http: HttpClient) {
    this.randId = 'id_' + this.gen_RandId();
  }

  addForm = new FormGroup({
    username: new FormControl(),
    amount: new FormControl(),
    type_of_trans: new FormControl(),
    cat_of_trans: new FormControl(),
    trans_date: new FormControl(),
    trans_hour: new FormControl(),
    payment_mode: new FormControl()
  })

  ngOnInit(): void {
  }

  formFields = ["username", "amount", "type_of_trans", "cat_of_trans", "trans_date", "trans_hour", "payment_mode"];

  postTransaction() {
    let formData = new FormData();
    for (let key of this.formFields) {
      formData.append(key, this.addForm.controls[key].value);
    }
    this.http.post("http://localhost:8000/add/", formData).subscribe(
      (next) => { console.log("success: ", next); },
      (err) => { console.log("Add form error", err); },
    );
  }

  gen_RandId() {
    let id = Math.random() * 1000;
    return Math.round(id)
  }

  logThis(val: string) {
    console.log(val);
    if (val.split('_')[0] === "nowid") {
      this.customDate = false;
    } else {
      this.customDate = true;
    }
  }
}
