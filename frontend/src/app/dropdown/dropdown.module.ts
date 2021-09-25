import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemanticDdComponent } from './semantic-dd/semantic-dd.component';



@NgModule({
  declarations: [
    SemanticDdComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SemanticDdComponent
  ]

})
export class DropdownModule { }
