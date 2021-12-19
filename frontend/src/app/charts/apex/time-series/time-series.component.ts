import { $trans_chart, FetcherService } from './../fetcher.service';
import { Component, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";

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


  x_axis!: Array<string | Date>;
  constructor(api: FetcherService) {
    api.get_trans_time_series().subscribe(
      (val) => {
        // update value to chart
        this.splitData(val);
        // this.initChartData();
      }
    )
  }

  splitData(api_data: Array<$trans_chart>): Array<string | Date> {
    let dates: Array<string | Date> = []
    api_data.forEach(
      (val: $trans_chart) => {
        console.log(val.timestamp);
        dates.push(val.timestamp);
      }
    );

    console.log("completed x: ", dates);
    return dates;
  }


  ngOnInit(): void {
  }


  // public initChartData(): void {

  //   this.series = [
  //     {
  //       name: "XYZ MOTORS",
  //       data: this.x_axis
  //     }
  //   ];

  //   this.chart = {
  //     type: "area",
  //     stacked: false,
  //     height: 350,
  //     zoom: {
  //       type: "x",
  //       enabled: true,
  //       autoScaleYaxis: true
  //     },
  //     toolbar: {
  //       autoSelected: "zoom"
  //     }
  //   };
  //   this.dataLabels = {
  //     enabled: false
  //   };
  //   this.markers = {
  //     size: 0
  //   };
  //   this.title = {
  //     text: "Stock Price Movement",
  //     align: "left"
  //   };
  //   this.fill = {
  //     type: "gradient",
  //     gradient: {
  //       shadeIntensity: 1,
  //       inverseColors: false,
  //       opacityFrom: 0.5,
  //       opacityTo: 0,
  //       stops: [0, 90, 100]
  //     }
  //   };
  //   this.yaxis = {
  //     labels: {
  //       formatter: function (val) {
  //         return (val / 1000000).toFixed(0);
  //       }
  //     },
  //     title: {
  //       text: "Price"
  //     }
  //   };
  //   this.xaxis = {
  //     type: "datetime"
  //   };
  //   this.tooltip = {
  //     shared: false,
  //     y: {
  //       formatter: function (val) {
  //         return (val / 1000000).toFixed(0);
  //       }
  //     }
  //   };
  // }
}
