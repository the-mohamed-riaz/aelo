import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from 'moment';
import {
  ApexAxisChartSeries,
  ApexChart, ApexDataLabels, ApexFill, ApexGrid,
  ApexLegend,
  ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent
} from "ng-apexcharts";
import { $trans_chart, FetcherService } from './../fetcher.service';

@Component({
  selector: 'apex-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.scss']
})
export class TimeSeriesComponent implements OnInit {

  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public title!: ApexTitleSubtitle;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;
  public grid!: ApexGrid;
  public legend!: ApexLegend;
  public colors: string[] = [];
  series_data!: Array<[number, number]>;


  constructor(api: FetcherService) {
    this.colors = ['#0090FF', '#00E396'];
    api.get_trans_time_series().subscribe(
      (val) => {
        console.log('received val: \n', val);
        this.series_data = this.splitData(val);
        this.initChartData()
      }
    )
  }

  splitData(api_data: Array<$trans_chart>): Array<[number, number]> {
    let series: Array<[number, number]> = []
    let parse = "YYYY-MM-DD HH:mm:ss Z"
    api_data.forEach(
      (val: $trans_chart) => {
        // console.log(moment(val.timestamp, parse).local());
        series.push([moment(val.timestamp, parse).valueOf(), val.account_balance]);
      }
    );
    console.debug("completed spliting data for charts: ", series);
    return series;
  }


  ngOnInit(): void {
  }


  public initChartData(): void {

    this.series = [
      {
        name: "Account balance",
        data: this.series_data
      }
    ];

    this.legend = {
      position: 'top',
      horizontalAlign: 'left'
    },
      this.chart = {
        type: "area",
        stacked: false,
        height: 205,
        width: 500,
        dropShadow: {
          enabled: true,
          top: -1,
          left: 3,
          blur: 5,
          opacity: 0.1
        },
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      };

    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0,
      strokeColors: ['#fff'],
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6
      }
    };
    this.grid = {
      padding: {
        left: -5,
        right: 5
      }
    }
    this.title = {
      align: "left"
    };
    this.fill = {

      type: "solid",
      opacity: 0.4

    };
    this.yaxis = {
      labels: {
        offsetX: 14,
        offsetY: -5,
        formatter: (value) => { return (value / 1000) + 'K' },
      },
      tooltip: {
        enabled: true
      },
      title: {
        text: "Balance"
      }
    };
    this.xaxis = {
      type: "datetime",
    };
    this.tooltip = {
      shared: false,
      x: {
        format: "dd MMM yyyy"
      },
      y: {
        formatter: (val) => {
          return (val / 1000) + 'K';
        }
      }
    };
  }
}