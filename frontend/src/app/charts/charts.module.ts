import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './apex/line/line.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TreemapComponent } from './apex/treemap/treemap.component';



@NgModule({
  declarations: [
    LineComponent,
    TreemapComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports:[
    LineComponent,
    TreemapComponent
  ]
})
export class ChartsModule { }
