import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Card1xComponent } from './card1x/card1x.component';



@NgModule({
  declarations: [
    Card1xComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    Card1xComponent
  ]
})
export class CardsModule { }
