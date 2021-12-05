import * as moment from 'moment/moment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { dropdown_option, EditableDropdownComponent } from 'src/app/shared/components/editable-dropdown/editable-dropdown.component';
import { FormDataGeneratorService, generateOptions } from './../../shared/form-data-generator.service';


export interface i_dropdowns {
  name: string | null;
  value: string | null;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'add-trans',
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.scss'],
})
export class AddTransComponent implements OnInit {
  user: string | null = null;
  catergoryOptions: Array<dropdown_option> = [];

  randId: string;
  customDate = true;
  constructor(private http: HttpClient, public dialog: MatDialog, private gen_form_data: FormDataGeneratorService, private cookie: CookieService) {
    this.user = this.cookie.get('username');
    this.randId = 'id_' + this.gen_RandId();
    this.http.get<string>('http://localhost:8000/options/?user=' + this.user).subscribe(
      (val: string) => {
        this.catergoryOptions = generateOptions(val.split(','));
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditableDropdownComponent, {
      width: '350px',
      closeOnNavigation: true,
      data: {
        title: 'Add/remove category labels', label: 'Category of transaction', placeholder: 'Add new label', options: this.catergoryOptions
      }
    });

    dialogRef.afterClosed().subscribe((result: Array<dropdown_option>) => {
      this.catergoryOptions = result;
      console.log(result);
      let op_dt = "";
      for (let i in result) {
        op_dt += result[i].value + ',';
      }
      op_dt = op_dt.slice(0, op_dt.length - 1);
      let data = new FormData();
      data.append('user', this.user!);
      data.append('cat_options', op_dt);
      if (this.cookie.check('username')) {
        this.user = this.cookie.get('username');
      };
      this.http.patch(`http://localhost:8000/options/?user=${this.user}`, { user: this.user, cat_options: op_dt }).subscribe(
        // this.http.post("http://localhost:8000/options/", data).subscribe(
        (val) => console.log("patching request ....\n", val),
        (err) => console.log("patching request ....\n", err)
      );
    });
  }

  editOptions(val: any) {
    console.log(val);
  }

  addForm = new FormGroup({
    username: new FormControl(this.user),
    amount: new FormControl(),
    type_of_trans: new FormControl(),
    cat_of_trans: new FormControl(),
    trans_date: new FormControl(),
    trans_hour: new FormControl(),
    payment_mode: new FormControl()
  })

  cat_opts: Array<i_dropdowns> = [
    { name: 'Family', value: 'family' },
    { name: 'Friend', value: 'friend' },
  ]

  ngOnInit(): void {
    if (this.cookie.check('user')) {
      this.user = this.cookie.get('user');
      this.addForm.controls['username'].setValue(this.user);
    };
  }

  formFields = ["username", "amount", "type_of_trans", "cat_of_trans", "trans_date", "trans_hour", "payment_mode"];

  postTransaction() {
    let formData = new FormData();
    this.addForm.controls['username'].setValue(this.user);
    let parse_date = moment(this.addForm.controls['trans_date'].value).format("YYYY-MM-DD");
    this.addForm.controls['trans_date'].setValue(parse_date);
    console.log("date: ", this.addForm.controls['trans_date'].value);
    for (let key of this.formFields) {
      formData.append(key, this.addForm.controls[key].value);
      console.debug(key, ':', this.addForm.controls[key].value);
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
