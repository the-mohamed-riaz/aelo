import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsModule } from '../cards/cards.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { AddTransComponent } from './add-trans/add-trans.component';
import { HomeComponent } from './home/home.component';
import { RecentTransactionComponent } from './recent-transaction/recent-transaction.component';
import { TransactionRoutingModule } from './transaction-routing.module';



@NgModule({
  declarations: [
    AddTransComponent,
    HomeComponent,
    RecentTransactionComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    DropdownModule,
    CardsModule
  ],
  exports: [
    HomeComponent,
    AddTransComponent,
  ]
})
export class TransactionModule { }
