import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsModule } from '../cards/cards.module';
import { ChartsModule } from '../charts/charts.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { MaterialsModule } from '../shared/materials/materials.module';
import { SharedComponentsModule } from './../shared/components/components.module';
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
    FormsModule,
    ReactiveFormsModule,
    TransactionRoutingModule,
    DropdownModule,
    CardsModule,
    ChartsModule,
    MaterialsModule,
    SharedComponentsModule
  ],
  exports: [
    HomeComponent,
    AddTransComponent
  ]
})
export class TransactionModule { }
