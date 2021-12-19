import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartistModule } from 'ng-chartist';
import { LineComponent } from './apex/line/line.component';
import { TreemapComponent } from './apex/treemap/treemap.component';



@NgModule({
  declarations: [
    LineComponent,
    TreemapComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgApexchartsModule,
  ],
  exports: [
    LineComponent,
    TreemapComponent,
  ]
})
export class ChartsModule { }
