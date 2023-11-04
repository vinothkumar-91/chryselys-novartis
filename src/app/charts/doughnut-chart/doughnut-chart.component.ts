import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { GlobalVariablesService } from 'src/app/global-variables.service';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() value:any;
  options:any = {
    color: this.gv.chartColor,
    // height: 200,
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        // x : 'right',
        right: 10,
        top: 'center'
        // data:['a1','test2','test3','test4','tes5']
    },
    // toolbox: {
    //     show : true,
    //     feature : {
    //         mark : {show: true},
    //         dataView : {show: true, readOnly: false},
    //         magicType : {
    //             show: true,
    //             type: ['pie', 'funnel'],
    //             option: {
    //                 funnel: {
    //                     x: '25%',
    //                     width: '50%',
    //                     funnelAlign: 'center',
    //                     max: 1548
    //                 }
    //             }
    //         },
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    // calculable : true,

    series : [
        {
            name:'Study Status',
            type:'pie',
            top: '0%',
            height: '100%',
            left: '-40%',
            radius : ['50%', '90%'],
            itemStyle : {
                normal : {
                    //  label : {
                    //     show: true, position: 'inner',color:'#fff',
                    //     formatter : function (params){
                    //           return  params.value + '%\n'
                    //     },
                    // },
                    label : {show: false},
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : false,
                        position: 'inner',
                        // formatter : function (params){
                        //       return  params.value + '%\n'
                        // },
                    }
                }
            },
            data:[ { name: 'Completed', value: 22 },
            { name: 'Recruiting', value: 9 },
            { name: 'Active not recruiting', value: 16 },
            { name: 'Terminated', value: 25 },
            { name: 'Withdrawn', value: 28 },
            { name: 'Suspended', value: 12 },
            { name: 'Not Recruiting', value: 4 }
            ]
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
