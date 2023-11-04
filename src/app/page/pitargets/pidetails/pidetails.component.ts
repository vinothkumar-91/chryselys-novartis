import { Component, OnInit, ViewChild } from '@angular/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { EChartsOption } from 'echarts';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { ApiServiceService } from 'src/app/api-service.service';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pidetails',
  templateUrl: './pidetails.component.html',
  styleUrls: ['./pidetails.component.css']
})
export class PidetailsComponent implements OnInit {
  readonly echartsExtentions: any[]=[
    PieChart,LineChart,
    BarChart,
    TooltipComponent,
    GridComponent,
    LegendComponent];
  id: any;
  overallOption:any = {val1:0,val2:0};

  apiCall: any = {
    basic: false,
    trails: false,
    payment: false,
    trail_history: false,
    paymentTrend: false,
    paymentsponsor: false,
    site_history: false
  };
  detailView: any = {
    basic:{},
    trails:{},
    payment:{},
    trail_history:{},
    paymentTrend:{},
    paymentsponsor:{},
    site_history:{}
  };


  trialsPhaseOption:any = {
      height: 140,
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "7%",
        height:'95%',
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: [],
        top: 0
      },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {},
        data: []
      }
    ],
    yAxis: {
          axisLabel: false,
          type: 'value',
          splitLine:{ show: true, lineStyle: {
            color: '#f7f7f7'
          } },
          axisLine: { show: false },
          axisTick: { show: false },
          // axisLabel: { show: false }
    },

    series: [
      {
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 3,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'top',
          color: '#333',
          formatter: '${c}k',
          valueAnimation: true
        },
        name: 'sales',
        type: 'bar',
        showBackground: true,
        data: [6, 32, 70, 86]
      }],
  };

  barChartPhases: EChartsOption = this.trialsPhaseOption


  constructor(
    private apiService: ApiServiceService,
    private gv: GlobalVariablesService,
    public route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.gv.scrollTopCommon();
    this.loadData();

    this.gv.setHeaderTitle('PI Targets')
  }

  getChartVal(val){
    return {val1:val,val2:(100-val)}
  }
  loadData() {

    this.apiCall['basic'] = true;
    this.apiService.postMethod(
      `${this.gv.baseUrl}get_investigator_details`,
      {"page":1,"per_page":10,"sort_by":"npi","order_by":"desc","pi_target":true,"filter_by":{"npi":[this.id]}},
      (r: any) => {this.detailView['basic'] = (r.data)?r.data[0]:{};this.apiCall['basic'] = false;},
      (error: any) => {this.apiCall['basic'] = false;}
    );


    this.apiCall['trails'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_header_by_npi?view=trails&npi=`+this.id,
      (r: any) => {this.detailView['trails'] = r.data;this.apiCall['trails'] = false;},
      (error: any) => {this.apiCall['trails'] = false;}
    );

    this.apiCall['payment'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_header_by_npi?view=payment&npi=`+this.id,
      (r: any) => {this.detailView['payment'] = r.data;this.apiCall['payment'] = false;},
      (error: any) => {this.apiCall['payment'] = false;}
    );

    this.apiCall['trail_history'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_data_by_npi?view=trail_history&npi=`+this.id,
      (r: any) => {this.detailView['trail_history'] = r.data;this.apiCall['trail_history'] = false;},
      (error: any) => {this.apiCall['trail_history'] = false;}
    );

    this.apiCall['site_history'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_data_by_npi?view=site_history&npi=`+this.id,
      (r: any) => {this.detailView['site_history'] = r.data;this.apiCall['site_history'] = false;},
      (error: any) => {this.apiCall['site_history'] = false;}
    );

    this.apiCall['paymentTrend'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_data_by_npi?view=payment&function=program_year&npi=`+this.id,
      (r: any) => {


        var res = (r.data) ? r.data : [];
        //console.log(res)
        var xaxis = [],newObj = []
        res.forEach(obj => {
          var _obj = {itemStyle: {color: '#62B2DB'}}
          var _va = String(obj['amount']/1000);
          _obj['value'] = parseFloat(_va).toFixed(0),//this.pipe.transform(obj['amount'], 'pipeFilter');
          xaxis.push(obj['program_year'])
          newObj.push(_obj)
        });
        console.log(xaxis)
        this.barChartPhases.series[0].data = newObj
        this.barChartPhases.xAxis= {
          data: xaxis,type: 'category',axisLabel: { interval: 0, rotate: 0 }
        }
        this.detailView['paymentTrend'] = this.barChartPhases;

        this.apiCall['paymentTrend'] = false;
      },
      (error: any) => {this.apiCall['paymentTrend'] = false;}
    );
    this.loadTableData();



    this.apiCall['paymentsponsor'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_data_by_npi?view=payment&function=sponsor&npi=`+this.id,
      (r: any) => {this.detailView['paymentsponsor'] = r.data;
      // console.log(this.detailView['paymentsponsor'])
      this.apiCall['paymentsponsor'] = false;},
      (error: any) => {this.apiCall['paymentsponsor'] = false;}
    );

  }

  @ViewChild(MatPaginator) data_paginator!: MatPaginator | null;
  @ViewChild(MatSort) data_sort!: MatSort | null;
  totalRows: any = 0
  pageSizeOptions: any = [5, 10, 20]
  filterValue: any = ''
  tableSortObj: any = { column: 'nct_id', order: 'desc' }
  pageSize: any = 5;
  currentPage = 0;
  dataTable: any = [];
  data_dataSource: any=new MatTableDataSource([]);

  displayedColumns_order = [
    "nct_id",
    "completed_status",
    "site_name",
    "sponsor",
  ];

  sortData() {
    // console.log(this.data_dataSource._sort.active)
    this.tableSortObj = {
      column: this.data_dataSource._sort.active,
      order: this.data_dataSource._sort._direction
    };
    this.currentPage = 0;
    this.loadTableData();
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadTableData();
  }

  tableRedraw() {
    this.data_dataSource.sort = this.data_sort;
  }
  filter: string | undefined;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.currentPage = 0;
    this.loadTableData();
  }

  get _gv(){
    return this.gv
  }

  loadTableData(){
    this.apiCall['get_study_details'] = true;
    this.apiService.postMethod(
      `${this.gv.baseUrl}get_study_details?view=payment&function=sponsor&npi=`+this.id,{
        page: (this.currentPage + 1),
        search_by:this.filterValue,
        per_page: this.pageSize,
        sort_by: this.tableSortObj.column.toLowerCase(),
        order_by: (this.tableSortObj.order).toLowerCase() //toUpperCase()
      },
      (r: any) => {
        var res = (r.data) ? r.data : [];
        this.totalRows = (r.count) ? (r.count) : this.totalRows;
        this.dataTable = res;
        this.data_dataSource = new MatTableDataSource(this.dataTable);
        this.tableRedraw();
        this.apiCall['get_study_details'] = false;},
      (error: any) => {this.apiCall['get_study_details'] = false;}
    );
  }
}
