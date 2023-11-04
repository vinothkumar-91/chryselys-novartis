import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  readonly echartsExtentions: any[];

  @Input() values:any;
  @Input() extentions:any;

option:any = {
  height:220,color: this.gv.chartColor,
  // splitLine:{ show: false },
  // axisLine: { show: false },
  // axisTick: { show: false },
  // axisLabel: { show: false },
  tooltip: {
    trigger: 'axis',
    formatter : function (params){
      var d = `${params[0].axisValue}<br />`;
      params.forEach(p => {
        d += `${p.seriesName}: $${p.value}K<br />`
      });
      return d;
    },
  },
  legend: {
    data: [],//['Otsuka', 'Janssen', 'Abbott', 'Stemline', 'Allergen']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine:{ show: true, lineStyle: {
      color: '#f7f7f7'
    } },
    // boundaryGap: false,
    data: [],//['2018', '2019', '2020', '2021', '2022', '2023', '2024']
  },
  yAxis: {
    // splitLine: {
    //   show: false
    // },
    // label:false,
    axisLabel: {
      formatter:  function (params){
        return  '$'+ params
      },
    },
    type: 'value'
  },
  series: [],//[
  //   {
  //     symbol: 'circle',
  //     symbolSize: 1,
  //     name: 'Otsuka',
  //     type: 'line',
  //     stack: 'Total',
  //     data: [120, 132, 101, 134, 90, 230, 210]
  //   },
  //   {
  //     symbol: 'circle',
  //     symbolSize: 1,
  //     name: 'Janssen',
  //     type: 'line',
  //     stack: 'Total',
  //     data: [220, 82, 191, 234, 290, 330, 310]
  //   },
  //   {
  //     symbol: 'circle',
  //     symbolSize: 1,
  //     name: 'Abbott',
  //     type: 'line',
  //     stack: 'Total',
  //     data: [150, 232, 201, 154, 90, 330, 410]
  //   },
  //   {
  //     symbol: 'circle',
  //     symbolSize: 1,
  //     name: 'Stemline',
  //     type: 'line',
  //     stack: 'Total',
  //     data: [320, 332, 301, 34, 390, 330, 320]
  //   },
  //   {
  //     symbol: 'circle',
  //     symbolSize: 1,
  //     name: 'Allergen',
  //     type: 'line',
  //     stack: 'Total',
  //     data: [820, 932, 1, 934, 290, 330, 320]
  //   }
  // ]
};
lineChartOption:EChartsOption = this.option


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
    console.log(this.lineChartOption,this.values)
    this.lineChartOption.legend['data'] = this.values.legendData
    this.lineChartOption.xAxis['data'] = this.values.xAxisData
    this.lineChartOption.series = this.values.series
  }

}
