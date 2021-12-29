import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexPlotOptions, ApexTitleSubtitle, ChartComponent
} from "ng-apexcharts";
import { $tree_map, FetcherService } from './../fetcher.service';

export type $ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};
@Component({
  selector: 'apex-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<$ChartOptions>;

  tree_chart_data: Array<$tree_map> = [];
  constructor(private getData: FetcherService) {
    this.chartOptions = {
      dataLabels: {
        enabled: true,
        style: {
          fontWeight: '300',
          fontSize: '12px',
          fontFamily: 'Montserrat'
        }
      },
      series: [{ data: this.tree_chart_data }],
      chart: {
        height: 253,
        width: 292,
        // offsetY:-40,
        type: "treemap",
        zoom: {
          enabled: false
        },

        toolbar: {
          show: false,
        }
      },
      plotOptions: {

        treemap: {
          distributed: true,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 5,
                color: '#EC3C65'
              },
              {
                from: 6,
                to: 20,
                color: '#F7B844'
              },
              {
                from: 21,
                to: 50,
                color: '#ADD8C7'
              },
              {
                from: 51,
                to: 100,
                color: '#1E5D8C'
              },
              {
                from: 101,
                to: 150,
                color: '#C1F666'
              },
              {
                from: 151,
                to: 200,
                color: '#EF6537'
              },
            ]
          }
        }
      },
      colors: [
        "#3B93A5",
        "#F7B844",
        "#ADD8C7",
        "#EC3C65",
        "#CDD7B6",
        "#C1F666",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#7F94B0",
        "#EF6537",
        "#C0ADDB"
      ],
      // plotOptions: {
      //   treemap: {
      //     distributed: true,
      //     enableShades: false
      //   }
      // },
      // title: {
      //   text: "",
      // }
    };
  }

  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  ngOnInit(): void {
    // this.chartOptions.series = {...this.chartOptions.series, data: this.tree_chart_data}
    this.getData.get_tree_map_data().subscribe(
      (val) => {
        this.tree_chart_data = val;
        this.chartOptions.series = [{ data: this.tree_chart_data }]
      },
      (err: any) => { console.log("Error in fetching tree map data:\n", err); }
    );
    setInterval(() => {
      this.getData.get_tree_map_data().subscribe(
        (val) => {
          this.tree_chart_data = val;
          this.chartOptions.series = [{ data: this.tree_chart_data }]
        },
        (err: any) => { console.log("Error in fetching tree map data:\n", err); }
      );
    }, 3000);
  }

}
