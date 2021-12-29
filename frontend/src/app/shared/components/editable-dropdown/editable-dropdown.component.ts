import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface $dropdown_option {
  name: string;
  value: string;
}

export interface $data {
  title: string;
  label: string;
  placeholder: string;
  options: Array<$dropdown_option>
}

@Component({
  selector: 'editable-dd',
  templateUrl: './editable-dropdown.component.html',
  styleUrls: ['./editable-dropdown.component.scss']
})
export class EditableDropdownComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<EditableDropdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: $data,
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): any {
    this.dialogRef.close(this.options);
  }

  ngOnInit(): void {
    this.options.sort((val1, val2) => (val1.name > val2.name ? 1 : -1));
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  options: Array<$dropdown_option> = this.data.options;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.options.push({ name: value, value: value.toLowerCase().replace(/ /g, "_") });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(val: $dropdown_option): void {
    const index = this.options.findIndex((v: $dropdown_option) => v.value === val.value);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }
}

