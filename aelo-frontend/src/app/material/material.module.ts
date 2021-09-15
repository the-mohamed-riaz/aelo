import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const Material_modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule
];

@NgModule({
  imports: [
    Material_modules,
  ],
  exports: [
    Material_modules,
  ]

})
export class MaterialModule { }
