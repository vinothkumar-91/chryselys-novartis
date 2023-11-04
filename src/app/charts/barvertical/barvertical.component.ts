import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets, plugins } from 'chart.js';

@Component({
  selector: 'app-barvertical',
  templateUrl: './barvertical.component.html',
  styleUrls: ['./barvertical.component.css']
})
export class BarverticalComponent implements OnInit {

  @Input() chartData: any;

  @Input() height: any;
  @Input() barChartData: any;
  @Input() barChartLabels: any;
  @Input() color: any;
  @Input() tableData:any;

  public barChartOptions: ChartOptions = {

    //     plugins: {
    //       datalabels: {
    //         color: 'white',
    //         display: function(context) {
    //           return context.dataset.data[context.dataIndex] > 15;
    //         },
    //         font: {
    //           weight: 'bold'
    //         },
    //         formatter: Math.round
    //       }
    //     },
    //     aspectRatio: 5 / 3,
    //     layout: {
    //       padding: {
    //         top: 24,
    //         right: 16,
    //         bottom: 0,
    //         left: 8
    //       }
    //     },
    //     elements: {
    //       line: {
    //         fill: false
    //       },
    //       point: {
    //         hoverRadius: 7,
    //         radius: 5
    //       }
    //     },
       
    // scales: {
    //   xAxes: [{

    //     gridLines: {
    //       color: "#fafafa",
    //     },
    //   }],
    //   yAxes: [{

    //     ticks: {
    //       min: 0,
    //       // max: 1,
    //       beginAtZero: true
    //     },
    //     gridLines: {
    //       color: "#fafafa",
    //     }
    //   }]
    // }
      
    
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
          weight: 'bold',
          size: 16
        }
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

    //         ctx.font = Chart.helpers.fontString(10, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    //         ctx.textAlign = 'center';
    //         ctx.textBaseline = 'bottom';

    //         this.data.datasets.forEach(function (dataset, i) {
    //             var meta = chartInstance.controller.getDatasetMeta(i);
    //             meta.data.forEach(function (bar, index) {
    //                 var data = dataset.data[index];
    //                 ctx.fillText(parseInt(data), bar._model.x, bar._model.y - 5);
    //             });
    //         });
    //     }
    // },
    tooltips: {
      backgroundColor: '#706b69'
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      onClick: function (e, legendItem) {
        // console.log(e, legendItem)
        // const index = legendItem.datasetIndex;
        // const type = legend.chart.config.type;
      },
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333'
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: "#fafafa",
        },
      }],
      yAxes: [{

        ticks: {
          min: 0,
          // max: 1,
          beginAtZero: true
        },
        gridLines: {
          color: "#fafafa",
        }
      }]
    }
  };


  // public chartColors:Array<any> = []

  constructor() {
  }

  ngOnInit(): void {
    // this.chartColors = this.color
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
    //   // {backgroundColor: this.color}
    // ];

  }

}
