import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() height: any;
  @Input() barChartData: any;
  @Input() barChartLabels: any;
  @Input() color: any;
  @Input() tableData:any;

  public sbarChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    // barPercentage: 0.5,
    // barThickness: 6,
    // maxBarThickness: 8,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
          weight: 'bold',
          size: 16
        }
      },
      colors: {
        forceOverride: true
      }
    },
    tooltips: {
      backgroundColor: '#706b69'
    },
    legend: {
      onClick: function (e, legendItem) {
        // console.log(e, legendItem)
      },
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333'
      }
    },
    
    // "hover": {
    //   "animationDuration": 0
    // },
    // "animation": {
    //     "duration": 1,
    //     "onComplete": function () {
    //         var chartInstance = this.chart,
    //             ctx = chartInstance.ctx;

    //         // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    //         ctx.font = Chart.helpers.fontString(11, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    //         ctx.textAlign = 'center';
    //         ctx.textBaseline = 'bottom';

    //         this.data.datasets.forEach(function (dataset, i) {
    //             var meta = chartInstance.controller.getDatasetMeta(i);
    //             meta.data.forEach(function (bar, index) {
    //                 var data = dataset.data[index];
    //                 ctx.fillText(data, bar._model.x+20, bar._model.y+8);
    //             });
    //         });
    //     }
    // },
    scales: {
      xAxes: [{
        ticks: {
          min: 0, beginAtZero: true
        },
        gridLines: {
          color: "#fafafa",
        },
      }],
      yAxes: [{
        ticks: {
          min: 0,
          // max: 12,
          beginAtZero: true
        },
        gridLines: {
          color: "#fafafa",
        }
      }]
    }
  };

  // public sbarChartColors:Array<any> = []// [{backgroundColor: '#9e9e9e'},{backgroundColor: '#00BCD4'}];



  constructor(private gv: GlobalVariablesService) {
  }

  ngOnInit(): void {
    // this.sbarChartColors = this.color;
    // [
    //   {backgroundColor: "#7eb0d5"}, 
    //   {backgroundColor: "#ffb55a"}, 
    //   {backgroundColor: "#8bd3c7"},
    //   {backgroundColor: "#fd7f6f"}, 
    //   {backgroundColor: "#ffee65"}, 
    //   {backgroundColor: "#beb9db"}, 
    //   {backgroundColor: "#fdcce5"}, 
    //   {backgroundColor: "#b2e061"}, 
    //   {backgroundColor: "#bd7ebe"}, 
    // ];
  }


}
