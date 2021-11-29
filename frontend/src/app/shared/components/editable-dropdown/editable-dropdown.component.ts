import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';


export interface option {
  name: string;
}

@Component({
  selector: 'editable-dd',
  templateUrl: './editable-dropdown.component.html',
  styleUrls: ['./editable-dropdown.component.scss']
})
export class EditableDropdownComponent implements OnInit {

  @Input() label: string = "default label";

  constructor() { }

  ngOnInit(): void {
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  options: option[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.options.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(val: option): void {
    const index = this.options.indexOf(val);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }
}

