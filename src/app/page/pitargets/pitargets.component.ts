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
  selector: 'app-pitargets',
  templateUrl: './pitargets.component.html',
  styleUrls: ['./pitargets.component.css']
})
export class PITargetsComponent implements OnInit {

  @ViewChild(MatPaginator) data_paginator!: MatPaginator | null;
  @ViewChild(MatSort) data_sort!: MatSort | null;

  displayedColumns_order = ["bookmark","rank","npi","pi_name","org_nm","status","cluster","moreinfo"];

  totalRows: any = 0
  pageSizeOptions: any = [5, 10, 20]
  filterValue: any = ''
  tableSortObj: any = { column: 'npi', order: 'desc' }
  pageSize: any = 10;
  currentPage = 0;
  data_dataSource: any;
  dataTable: any = [];
  apiCall:boolean= false

  constructor(route: ActivatedRoute, private router: Router, private http: HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService) { }
  currentObj:any={};
  ngOnInit(): void {
    this.loadTableData();

  //   this.dataTable= [{
  //     "pi_name": "michael j burdick",
  //     "npi": 1770576258,
  //     "rank": "703 n flamingo rd",
  //     "org_nm": null,
  //     "cluster": "pembroke pines",
  //     "status": "md",
  // }]
  //   this.data_dataSource = new MatTableDataSource(this.dataTable)
  //   this.tableRedraw()



    this.gv.setHeaderTitle('PI Targets')
  }

  loadTableData(){
    this.apiCall= true

    this.apiService.postMethod(`${this.gv.baseUrl}get_investigator_details`,
      {
        pi_target:true,
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

    bookmarkupdate(val,element){
      // this.currentObj['bookmark'] = val;
      // console.log(this.data_dataSource.data)

    // console.log(this.data_dataSource.data[idx].is_book_marked,val)

      var req = {
        "bookmark_value": element.npi,
        "product":"PiT",
        "bookmark_name":"pi_target"
      }
      this.apiCall = true;
      this.apiService.postMethod((val)?`${this.gv.userBaseUrl}add_favourites`:`${this.gv.userBaseUrl}delete_favorites`, JSON.stringify(req), (r: any) => {
        this.apiCall = false;
        if (r.status_code == 200) {

          const idx = this.data_dataSource.data.findIndex((x) => x.npi === element.npi);
          this.data_dataSource.data[idx].is_book_marked = val;

        }
        }, (error: any) => {this.apiCall = false;})
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
