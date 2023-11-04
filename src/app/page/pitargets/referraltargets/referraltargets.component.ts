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
  selector: 'app-referraltargets',
  templateUrl: './referraltargets.component.html',
  styleUrls: ['./referraltargets.component.css']
})
export class ReferraltargetsComponent implements OnInit {
  readonly echartsExtentions: any[]=[
    PieChart,LineChart,
    BarChart,
    TooltipComponent,
    GridComponent,
    LegendComponent];
  id: any;
  overallOption:any = {val1:0,val2:0};
  refereralType:any = 'Affiliation';
  apiCall: any = {
    basic: false,
    referralList: false
  };
  detailView: any = {
    basic:{},
    referralList:{}
  };
  constructor(
    private apiService: ApiServiceService,
    private gv: GlobalVariablesService,
    public route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.gv.scrollTopCommon();


    this.apiCall['basic'] = true;
    this.apiService.getMethod(`${this.gv.baseUrl}get_referrer_details?npi=`+this.id
    , (r: any) => {
        this.detailView['basic'] = (r.data.length==0)?{
          investigator_name:'',
          siteorgname_l2:'',
          physician_zip_cd:'',
          physician_city:'',
          physician_state:'',
          physician_address_1:'',
        }:r.data[0];
        this.apiCall['basic']= false;
      }, (error: any) => { this.apiCall['basic']= false; })


    this.loadData();

    this.gv.setHeaderTitle('Referral Targets')
  }


  loadData() {

    // this.apiService.postMethod(
    //   `${this.gv.baseUrl}get_investigator_details`,
    //   {"page":1,"per_page":10,"sort_by":"npi","order_by":"desc","pi_target":true,"filter_by":{"npi":[this.id]}},
    //   (r: any) => {this.detailView['basic'] = (r.data)?r.data[0]:{};this.apiCall['basic'] = false;},
    //   (error: any) => {this.apiCall['basic'] = false;}
    // );




    this.apiCall['referralList'] = true;
    this.apiService.postMethod(
      `${this.gv.baseUrl}get_referral_targets`,
      {
        page: (this.currentPage + 1),
        search_by:this.filterValue,
        per_page: this.pageSize,
        sort_by: this.tableSortObj.column.toLowerCase(),
        order_by: (this.tableSortObj.order).toLowerCase(),
        npi:this.id,refer_by:this.refereralType
      },
      (r: any) => {
        this.dataTable = (r.data) ? r.data : [];
        this.totalRows = (r.count) ? (r.count) : this.totalRows;
        this.data_dataSource = new MatTableDataSource(this.dataTable);
        this.tableRedraw()
        this.apiCall['referralList'] = false;
      },
      (error: any) => {this.apiCall['referralList'] = false;}
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
    this.apiCall['referralList'] = true;
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
        this.apiCall['referralList'] = false;},
      (error: any) => {this.apiCall['referralList'] = false;}
    );
  }
}
