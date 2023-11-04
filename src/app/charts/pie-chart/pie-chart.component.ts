import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() value:any;
  options:any = {
    color: this.gv.chartColor,
    series : [
        {
  avoidLabelOverlap: true,
          label: {formatter:'{b}: {c} ({d}%)'},
          // label: {formatter:'{b}: {@[c]} ({d}%)'},
            name:'Study Status',
            type:'pie',
            top: '0%',
            height: '100%',
            // left: '-40%',
            radius : ['50%', '90%'],
            // itemStyle : {
            //     normal : {
            //          label : {
            //             show: true, position: 'inner',color:'#fff',
            //             formatter : function (params){
            //                   return  params.value + '%\n'
            //             },
            //         },
            //         labelLine : {
            //             show : false
            //         }
            //     },
            //     emphasis : {
            //         label : {
            //             show : false,
            //             position: 'inner',
            //             // formatter : function (params){
            //             //       return  params.value + '%\n'
            //             // },
            //         }
            //     }
            // },
            data:[ ]
        }
    ]
};

  pieChart:EChartsOption;
  @Input() extentions:any;
  constructor(private gv: GlobalVariablesService) { }

  ngOnInit(): void {
    this.options['color'] = this.gv.chartColor;
    this.options.series[0].data = this.value;
    this.pieChart = this.options;
  }

}