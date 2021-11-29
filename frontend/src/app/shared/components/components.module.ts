import { MaterialsModule } from './../materials/materials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableDropdownComponent } from './editable-dropdown/editable-dropdown.component';



@NgModule({
  declarations: [
    EditableDropdownComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [
    EditableDropdownComponent
  ]
})
export class SharedComponentsModule { }
