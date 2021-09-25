import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { AddTransComponent } from './add-trans/add-trans.component';
import { HomeComponent } from './home/home.component';
import { DropdownModule } from '../dropdown/dropdown.module';


@NgModule({
  declarations: [
    AddTransComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    DropdownModule,
  ],
  exports: [
    HomeComponent,
    AddTransComponent,
  ]
})
export class TransactionModule { }
