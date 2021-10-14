import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './apex/line/line.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    LineComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports:[
    LineComponent
  ]
})
export class ChartsModule { }
