import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface i_dropdowns {
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormDataGeneratorService {

  constructor() { }

  generateFormData(arr_keys: Array<string>, form_group: FormGroup): FormData {
    let form = new FormData();
    for (let key of arr_keys) {
      form.append(key, form_group.controls[key].value);
    }
    return form;
  }

}


export function generateOptions(val: string[] | number[]): Array<i_dropdowns> {
  let options: i_dropdowns[] = [];

  for (let item in val) {
    let str: string | number = val[item];
    if (typeof str === 'string') {
      options.push({ name: `${conver_to_human_name(str)}`, value: `${('' + str).toLowerCase().replace(/ /g, '_')}` })
    } else if (typeof val[item] === 'number') {
      options.push({ name: `${val[item]}`, value: `${val[item]}` });
    }
  }

  // console.log(options);
  return options;
}


export function conver_to_human_name(val: string): string {
  let ln = val.length;
  val = val.charAt(0).toUpperCase() + val.slice(1, ln).toLowerCase();
  val = val.replace(/_/g, ' ');
  return val;
}