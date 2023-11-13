import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
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
  data_dataSource: any;
  dataTable: any = [];
  apiCall:any =  {
    uploading:false,list:true,role:false,ta:false,common:false,
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
  displayedColumns = ["user_id","role","_id"];

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort | null;


  constructor(private datePipe: DatePipe, route: ActivatedRoute, private router: Router, private http: HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService)
  {

    route.params.subscribe((params) => {
      this.activetab= params["id"];
    });


  }


  ngOnInit(): void {

this.getUserDetails()

  }

  getUserDetails(){
    this.apiCall['list']= true
  this.apiService.getMethod(`${this.gv.baseUrl}/get_user_details`, (r: any) => {
    var res = (r.data) ? r.data.user_details : [];
    // this.totalRows = res.length;
    // this.dataTable = res;
    this.data_dataSource = new MatTableDataSource(res);
    // console.log(this.data_dataSource)
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

  // ngAfterViewInit() {this.tableRedraw()}

  filter:string | undefined;
  applyFilter(filterValue: string) {

    this.data_dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.data_dataSource.filter);
    if (this.data_dataSource.paginator) {
      this.data_dataSource.paginator.firstPage();
    }
    this.tableRedraw()

    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // console.log(this.dataTable.filter);
    // this.dataTable.filter = filterValue;

    // if (this.dataTable.paginator) {
    //   this.dataTable.paginator.firstPage();
    // }

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
    setTimeout(() => {this.data_dataSource.sort = this.sort;}, 1000);
  }
  // tabchanged(tab: number){
  //   setTimeout(() => {
  //     this.tableRedraw()
  //   }, 1);
  //   this.dataTable.filter = '';
  //   this.filter = '';
  // }




  public isExcelValid: boolean = true;
  public uploadData(event: any) {
    if (this.isExcelValid) {
      this.apiCall['uploading'] = true;
      // console.log(event.target.files[0]);

      var fd = new FormData();
      fd.append('file', event.target.files[0]);

      this.apiService.filepostMethod(`${this.gv.baseUrl}/update_user_details`, fd, (r: any) => {

        if (r.status_code == 200) {
          this.getUserDetails()
          this.gv.setApiResPopup({ data: {}, res: r });
        }
        this.popuptype = '';
        this.apiCall['uploading'] = false;
      }, (error: any) => { this.apiCall['uploading'] = false; })
      // }else{
      //   alert("Invalid Excel")
      // }


    };
  }


  sampleExcel() {

    var header = ["test"]

    // // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet1 = workbook.addWorksheet('data');
    const headerRow1 = worksheet1.addRow(header);

    // Cell Style : Fill and Border
    headerRow1.eachCell((cell, number) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffffff' }, bgColor: { argb: '00000000' } };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, 'Users' + this.datePipe.transform(new Date(), 'medium') + '.xlsx');
    });
  }




}
