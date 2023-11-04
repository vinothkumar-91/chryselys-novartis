import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.css']
})
export class InvestigatorComponent implements OnInit {

  @ViewChild(MatPaginator) data_paginator!: MatPaginator | null;
  @ViewChild(MatSort) data_sort!: MatSort | null;


  // "city": "Aurora",
  // "completed_status": null,
  // "country": "United States",
  // "latitude": "39.75",
  // "longitude": "-104.84",
  // "npi": "1285724963",
  // "pi_name": "Paul Bunn",
  // "site_name": "Colorado Research Center",
  // "state": "Colorado",
  // "zip": "80045"


  displayedColumns_order = [
    "pi_name",
    "completed_status",
    "site_name",
    "zip",
    "city",
    "state",
    "country"
  ];

  totalRows: any = 0
  pageSizeOptions: any = [5, 10, 20]
  filterValue: any = ''
  tableSortObj: any = { column: 'nct_id', order: 'desc' }
  pageSize: any = 10;
  currentPage = 0;
  data_dataSource: any;
  dataTable: any = [];
  apiCall:boolean= true

  @Input() id:any;
  constructor(private gv: GlobalVariablesService, private apiService: ApiServiceService,public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData(){
    this.apiCall= true
    this.apiService.postMethod(`${this.gv.baseUrl}get_investigator_details`,
    // {"page":1,"per_page":10,"order_by":"desc","sort_by":"nct_id","filter_by":{"nct_id":["NCT03631706"]}}
      {
        filter_by:{"nct_id":[this.id]},
        page: (this.currentPage + 1),
        search_by:this.filterValue,
        per_page: this.pageSize,
        sort_by: this.tableSortObj.column.toLowerCase(),
        order_by: (this.tableSortObj.order).toLowerCase() //toUpperCase()
      }
      , (r: any) => {
        var res = (r.data) ? r.data : [];
        this.totalRows = (r.count) ? (r.count) : this.totalRows;
        this.dataTable = res;
        this.data_dataSource = new MatTableDataSource(this.dataTable);
        this.tableRedraw()
        this.apiCall= false;
      }, (error: any) => { this.apiCall= false; })
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
