import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Card1xComponent } from './card1x/card1x.component';



@NgModule({
  declarations: [
    Card1xComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    Card1xComponent
  ]
})
export class CardsModule { }
