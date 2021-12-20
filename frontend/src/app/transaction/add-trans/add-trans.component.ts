import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment/moment';
import { CookieService } from 'ngx-cookie-service';
import { $dropdown_option, EditableDropdownComponent } from 'src/app/shared/components/editable-dropdown/editable-dropdown.component';
import { ApiService } from '../services/api.service';
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
  username: string | null = null;
  catergoryOptions: Array<$dropdown_option> = [];

  randId: string;
  customDate = true;

  constructor(private http: HttpClient, public dialog: MatDialog, private gen_form_data: FormDataGeneratorService, private cookie: CookieService, private _snackBar: MatSnackBar, private api: ApiService) {
    this.username = this.cookie.get('username');
    this.randId = 'id_' + this.gen_RandId();
    this.api.get_cat_options().subscribe(
      (val: string) => {
        this.catergoryOptions = generateOptions(val.split(','));
      }
    )
  }

  re_initialize_form() {
    if (this.cookie.check('username')) {
      this.username = this.cookie.get('username');
      this.addForm.controls['username'].setValue(this.username);
    };
    this.addForm.controls['trans_date'].setValue(moment(new Date()).format("YYYY-MM-DD"));
    this.addForm.controls['trans_hour'].setValue(new Date().getHours() + ":" + new Date().getMinutes());
  }

  addForm = new FormGroup({
    username: new FormControl(this.username),
    amount: new FormControl(null),
    comment: new FormControl(null),
    type_of_trans: new FormControl(null),
    cat_of_trans: new FormControl(null),
    trans_date: new FormControl(moment(new Date()).format("YYYY-MM-DD")),
    trans_hour: new FormControl(new Date().getHours() + ":" + new Date().getMinutes()),
    payment_mode: new FormControl(null)
  })

  openDialog(): void {
    const dialogRef = this.dialog.open(EditableDropdownComponent, {
      width: '350px',
      closeOnNavigation: true,
      data: {
        title: 'Add/remove category labels', label: 'Category of transaction', placeholder: 'Add new label', options: this.catergoryOptions
      }
    });

    dialogRef.afterClosed().subscribe((result: Array<$dropdown_option>) => {
      this.catergoryOptions = result;
      console.log(result);
      let op_dt = "";
      for (let i in result) {
        op_dt += result[i].value + ',';
      }
      op_dt = op_dt.slice(0, op_dt.length - 1);
      let data = new FormData();
      data.append('username', this.username!);
      data.append('cat_options', op_dt);
      if (this.cookie.check('username')) {
        this.username = this.cookie.get('username');
      };
      this.api.patch_cat_options(this.username!, op_dt);
    });
  }

  editOptions(val: any) {
    console.log(val);
  }


  cat_opts: Array<i_dropdowns> = [
    { name: 'Family', value: 'family' },
    { name: 'Friend', value: 'friend' },
  ]

  ngOnInit(): void {
    if (this.cookie.check('username')) {
      this.username = this.cookie.get('username');
      this.addForm.controls['username'].setValue(this.username);
    };
  }

  formFields = ["username", "amount", "type_of_trans", "comment", "cat_of_trans", "trans_date", "trans_hour", "payment_mode"];

  postTransaction() {
    let formData = new FormData();
    this.addForm.controls['username'].setValue(this.username);
    let parse_date = moment(this.addForm.controls['trans_date'].value).format("YYYY-MM-DD");
    this.addForm.controls['trans_date'].setValue(parse_date);
    console.log("date: ", this.addForm.controls['trans_date'].value);
    for (let key of this.formFields) {
      formData.append(key, this.addForm.controls[key].value);
      console.debug(key, ':', this.addForm.controls[key].value);
    }
    this.api.add_transaction(formData).subscribe(
      (next) => {
        console.log("success: ", next);
        this.re_initialize_form();
        this._snackBar.open("Last transaction was noted succesfully!", "OK", { duration: 3000 });
      },
      (err) => { console.log("Add form error", err); },
      () => {
        this.addForm.reset();
        this.re_initialize_form();
      }
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
