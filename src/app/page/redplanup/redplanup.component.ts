import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-redplanup',
  templateUrl: './redplanup.component.html',
  styleUrls: ['./redplanup.component.css']
})
export class REDPLANUPComponent implements OnInit {

  @ViewChild(MatPaginator) data_paginator!: MatPaginator | null;
  @ViewChild(MatSort) data_sort!: MatSort | null;

  displayedColumns_order = ["rank","npi","investigator_name","prvdr_credentials","prvdr_specialty","moreinfo"];

  totalRows: any = 0
  pageSizeOptions: any = [5, 10, 20]
  filterValue: any = ''
  tableSortObj: any = { column: 'npi', order: 'desc' }
  pageSize: any = 10;
  currentPage = 0;
  data_dataSource: any;
  dataTable: any = [];
  apiCall:boolean= true

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.loadTableData();
    this.gv.setHeaderTitle('REDPLANUP')
  }

  loadTableData(){
    this.apiCall= true
    this.apiService.postMethod(`${this.gv.baseUrl}get_redplanup_details`,
      {
        // filter_by:{"ta":["psychiatry"],"disease_area":["MDD"]},
        // filter_by:{"ta":this.gv.portal['TAD'].TA.therapeutic_name,"disease_area":this.gv.portal['TAD'].D.disease_name},
        page: (this.currentPage + 1),
        search_by:this.filterValue,
        per_page: this.pageSize,
        sort_by: this.tableSortObj.column.toLowerCase(),
        order_by: (this.tableSortObj.order).toLowerCase() //toUpperCase()
      }, (r: any) => {
        var res = (r.data) ? r.data : [];
        this.totalRows = (r.count) ? (r.count) : this.totalRows;
        this.dataTable = res;
        this.data_dataSource = new MatTableDataSource(this.dataTable);
        this.tableRedraw()
        this.apiCall= false;
      }, (error: any) => { this.apiCall= false; })
    }
get _gv(){
  return this.gv
}


  sortData() {
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

}
