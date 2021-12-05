import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialsModule } from './../materials/materials.module';
import { EditableDropdownComponent } from './editable-dropdown/editable-dropdown.component';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    EditableDropdownComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [
    EditableDropdownComponent,
    TableComponent
  ]
})
export class SharedComponentsModule { }
