import { HttpClient } from '@angular/common/http';

import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartEvent } from "ng-chartist";
import * as Chartist from "chartist";



export interface Chart {
  type: ChartType;
  data: any;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  // plugins?: any;
}

@Component({
  selector: 'widget-line-chart',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input() y_axis: Array<number> | null = null;

  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
    this.WidgetlineChart.data = { "labels": ["0", "1", "2", "3"], "series": [this.y_axis] };
    this.WidgetlineChart.options.axisY = { ...this.WidgetlineChart.options.axisY, "low": get_Ymin(this.y_axis) };
    console.log("lowest val: ", this.WidgetlineChart.options.axisY.low);
  }


  WidgetlineChart: Chart = {
    type: 'Line', data: {
      "labels": ["0", "1", "2", "3"],
      "series": [[1, 3, 1, 2]]
    },
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 0,
        showLabel: false,
        offset: 0
      },
      fullWidth: true
    }
  };


}


function get_Ymin(params: Array<number> | null): number {
  if (params) {
    return Math.min(...params);
  }
  return 0;
}