import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { dropdown_option, EditableDropdownComponent } from 'src/app/shared/components/editable-dropdown/editable-dropdown.component';

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
  styleUrls: ['./add-trans.component.scss']
})
export class AddTransComponent implements OnInit {


  catergoryOptions: Array<dropdown_option> = [];

  randId: string;
  customDate = true;
  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.randId = 'id_' + this.gen_RandId();
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
    });
  }

  editOptions(val: any) {
    console.log(val);
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

  cat_opts: Array<i_dropdowns> = [
    { name: 'Family', value: 'family' },
    { name: 'Friend', value: 'friend' },
  ]

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
