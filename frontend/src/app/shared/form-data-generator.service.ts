import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

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
  // console.log(val);
  for (let item in val) {
    if (typeof val[item] === 'string') {
      options.push({ name: `${val[item]}`, value: `${('' + val[item]).toLowerCase().replace(/ /g, '_')}` })
    } else if (typeof val[item] === 'number') {
      options.push({ name: `${val[item]}`, value: `${val[item]}` });
    }
  }
  // console.log(options);
  return options;
}
