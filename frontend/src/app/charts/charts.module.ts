import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './apex/line/line.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TreemapComponent } from './apex/treemap/treemap.component';
import { ChartistModule } from 'ng-chartist';
import { ChartistLineComponent } from './chartist/line/line.component';



@NgModule({
  declarations: [
    LineComponent,
    TreemapComponent,
    ChartistLineComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ChartistModule
  ],
  exports: [
    LineComponent,
    TreemapComponent,
    ChartistLineComponent
  ]
})
export class ChartsModule { }
