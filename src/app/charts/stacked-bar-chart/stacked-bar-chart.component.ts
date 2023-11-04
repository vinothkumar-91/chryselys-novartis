import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {
  readonly echartsExtentions: any[];

  @Input() values:any;
  @Input() extentions:any;

option:any = { tooltip: {
  trigger: 'axis',
  height:220,color: this.gv.chartColor,
  axisPointer: {
    // Use axis to trigger tooltip
    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
  }
},
legend: {},
grid: {
  left: '3%',
  right: '4%',
  bottom: '3%',
  containLabel: true
},
xAxis: {
  type: 'value',
  axisLabel: {
    formatter:  function (params){
      return  params+'K'
    },
  },
},
yAxis: {
  type: 'category',
  data: [], //['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
},
series: [
  // {
  //   name: '2019',
  //   type: 'bar',
  //   stack: 'total',
  //   label: {
  //     show: true
  //   },
  //   emphasis: {
  //     focus: 'series'
  //   },
  //   data: [320, 302, 301, 334, 390]
  // },
  // {
  //   name: '2020',
  //   type: 'bar',
  //   stack: 'total',
  //   label: {
  //     show: true
  //   },
  //   emphasis: {
  //     focus: 'series'
  //   },
  //   data: [120, 132, 101, 134, 90]
  // },
  // {
  //   name: '2021',
  //   type: 'bar',
  //   stack: 'total',
  //   label: {
  //     show: true
  //   },
  //   emphasis: {
  //     focus: 'series'
  //   },
  //   data: [220, 182, 191, 234, 290]
  // },
  // {
  //   name: '2022',
  //   type: 'bar',
  //   stack: 'total',
  //   label: {
  //     show: true
  //   },
  //   emphasis: {
  //     focus: 'series'
  //   },
  //   data: [150, 212, 201, 154, 190]
  // },
  // {
  //   name: '2023',
  //   type: 'bar',
  //   stack: 'total',
  //   label: {
  //     show: true
  //   },
  //   emphasis: {
  //     focus: 'series'
  //   },
  //   data: [820, 832, 901, 934, 1290]
  // }
]
};
stackedChartOption:EChartsOption = this.option


  constructor(private gv: GlobalVariablesService) {

    this.echartsExtentions = [
      PieChart,LineChart,
      BarChart,
      TooltipComponent,
      GridComponent,
      LegendComponent
    ];

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("value changed", this.values);
  }

  ngOnInit(): void {
    console.log(this.stackedChartOption,this.values)
    // this.stackedChartOption.legend['data'] = this.values.legendData
    this.stackedChartOption.yAxis['data'] = this.values.yAxisData
    this.stackedChartOption.series = this.values.series
    this.stackedChartOption.color= this.gv.chartColor
  }

}
