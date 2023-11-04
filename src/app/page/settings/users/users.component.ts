import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm:any={
    first_name:'',last_name:'',role:null,email:'',notes:'' //ta:null,disease:null, //organisation:''
  }
  totalRows: any = 0
  pageSizeOptions: any = [5, 10, 20]
  filterValue: any = ''
  tableSortObj: any = { column: 'created_on', order: 'desc' }
  pageSize: any = 5;
  currentPage = 0;
  data_dataSource: any=new MatTableDataSource([]);
  dataTable: any = [];
  apiCall:any =  {
    list:true,role:false,ta:false,common:false,
  }
  activetab:any=0;
  userFormVisible:boolean=false;
  list:any = {
    "role": [],
    "therapeutic_area": [],
    "disease": []
}
  formType='add'
  popuptype:any = '';
  currentObj:any;
  displayedColumns = ["first_name","last_name","email","role","last_activity","action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort | null;


  constructor(private datePipe: DatePipe, route: ActivatedRoute, private router: Router, private http: HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService)
  {

    route.params.subscribe((params) => {
      this.activetab= params["id"];
    });


  }


  ngOnInit(): void {

    this.apiCall['role']= true
    this.apiService.getMethod(`${this.gv.userBaseUrl}get_lov?function=role`,(r: any) => {
      this.list['role'] = r.data //.map((r)=>{return r.role_name});
      this.apiCall['role']= false;
      // console.log(this.list['role'])
    }, (error: any) => { this.apiCall['role']= false; })



    this.apiCall['ta']= true
    this.apiService.getMethod(`${this.gv.userBaseUrl}get_lov?function=therapeutic`,(r: any) => {
        this.list['disease'] = {}
        this.list['therapeutic_area'] = []

        r.data.forEach((t)=>{
          this.list['therapeutic_area'].push(t)
          this.list['disease'][t.therapeutic_name] = t.disease_data //.map((d)=>{return d.disease_name})
        })
        // console.log(this.list['therapeutic_area'],this.list['disease'])

        this.apiCall['ta']= false;
      }, (error: any) => { this.apiCall['ta']= false; })


this.getUserDetails()

  }

  getUserDetails(){
    this.apiCall['list']= true
  this.apiService.postMethod(`${this.gv.userBaseUrl}get_user_list`,
  {
    page: (this.currentPage + 1),
    search_by:this.filterValue,
    filter_by:{status:['active']},
    per_page: this.pageSize,
    sort_by: this.tableSortObj.column.toLowerCase(),
    order_by: (this.tableSortObj.order).toLowerCase() //toUpperCase()
  }, (r: any) => {
    var res = (r.data) ? r.data : [];
    this.totalRows = (r.count) ? (r.count) : this.totalRows;
    this.dataTable = res;
    // console.log(this.dataTable)
    this.data_dataSource = new MatTableDataSource(this.dataTable);
    console.log(this.data_dataSource)
    this.tableRedraw()
    this.apiCall['list']= false;
  }, (error: any) => { this.apiCall['list']= false; })
}

  adduser(){
    this.apiCall['common']= true;
    if(this.formType=='add'){
      this.apiService.postMethod(`${this.gv.userBaseUrl}add_user_details`, this.userForm,(r: any) => {
          this.apiCall['common']= false;
        if(r.status_code == 200){
          this.userFormVisible=false;
          this.gv.setApiResPopup({ data: {}, res: { message: r.message, status: "User",status_code: 200}})
          this.getUserDetails()
        }
      }, (error: any) => { this.apiCall['common']= false; })
    }else if(this.formType=='edit'){
      this.apiService.putMethod(`${this.gv.userBaseUrl}update_user_details`, this.userForm,(r: any) => {
          this.apiCall['common']= false;
        if(r.status_code == 200){
          this.userFormVisible=false;
          this.gv.setApiResPopup({ data: {}, res: { message: r.message, status: "User",status_code: 200 }})
          this.getUserDetails()
        }
      }, (error: any) => { this.apiCall['common']= false; })

    }

  }

  deleteCallback(id:any){
    this.apiCall['common']= true;
    this.apiService.postMethod(`${this.gv.userBaseUrl}delete_user`, {"user_id":this.currentObj.user_id}
    ,(r: any) => {
        this.apiCall['common']= false;
      if(r.status_code == 200){
        this.userFormVisible=false;
        this.popuptype='';
        this.gv.setApiResPopup({ data: {}, res: { message: r.message, status: "User Management",status_code: 200 }})
        this.getUserDetails()
      }
    }, (error: any) => { this.apiCall['common']= false; })

  }

  ngAfterViewInit() {this.tableRedraw()}

  filter:string | undefined;
  applyFilter(filterValue: string) {
    // console.log(filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataTable.filter = filterValue;

    this.currentPage = 0;
    this.getUserDetails()


  }


  // loadData(exporter: any){

  //   this.apiService.postMethod(`${this.gv.baseUrl}get_trial_details`,
  //   {
  //     page: 1,search_by: this.id,per_page: 1,sort_by: 'nct_id',order_by: 'desc'
  //   }, (r: any) => {
  //     var res = (r.data) ? r.data[0] ? r.data[0] : this.detailView.basic : this.detailView.basic;
  //     this.detailView.basic = res;
  //     this.apiCall['basic'] = false;

  //   }, (error: any) => { this.apiCall['basic'] = false; })

  // }

  tableRedraw(){
    this.data_dataSource.sort = this.sort;
      this.dataTable.paginator = this.paginator;
    // if(this.activetab==0){c
    //   this.dataTable.sort = this.sort;
    // }
  }
  sortData(){
    console.log(this.data_dataSource._sort.active)
    this.tableSortObj = {
      column: this.data_dataSource._sort.active,
      order: this.data_dataSource._sort._direction
    };
    this.currentPage = 0;
    this.getUserDetails();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getUserDetails();
  }
  tabchanged(tab: number){
    setTimeout(() => {
      this.tableRedraw()
    }, 1);
    this.dataTable.filter = '';
    this.filter = '';
  }



}
