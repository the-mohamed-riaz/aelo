import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Card1xComponent } from './card1x/card1x.component';



@NgModule({
  declarations: [
    Card1xComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    CommonModule
  ],
  exports: [
    Card1xComponent
  ]
})
export class CardsModule { }
