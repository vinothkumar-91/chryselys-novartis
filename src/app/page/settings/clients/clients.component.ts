import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
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
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  list:any={
    login:[{logintype:'Login Form'},{logintype:'Microsoft SSO'}],
    ta_d:[]
  }
  userForm:any=

  {
        "client_address": "ABC address",
        "client_name": "ABC",
        "client_status": true,
        "contact_email": "rony@example.com",
        "contact_no": "1234567890",
        "contact_person": "Rony Thomas",
        "config_client_name": "ABC",
        "login_url": "https://login.microsoft.com",
        "logout_url": "https://logout.microsoft.com",
        "sso_client_id": "YourClientId",
        "login_type": "Microsoft",
    "subscription_details": [
        {
          "therapeutic_name": "Psychiatry",
          "disease_name": "MDD",
            "therapeutic_id": "Psychiatry",
            "disease_id": "MDD",
            "sub_end_date": "",
            "sub_start_date": ""
        }
    ]
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
//   list:any = {
//     "role": [],
//     "therapeutic_area": [],
//     "disease": []
// }
  formType='add'
  popuptype:any = '';
  currentObj:any;
  displayedColumns = ["client_name","contact_email","client_status","subscription_length","action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort | null;


  constructor(private datePipe: DatePipe, route: ActivatedRoute, private router: Router, private http: HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService)
  {
    this.getAllTA()

    route.params.subscribe((params) => {
      this.activetab= params["id"];
    });


  }


  ngOnInit(): void {

this.getUserDetails()

  }

  getUserDetails(){
  //   this.apiCall['list']= true
  // this.apiService.postMethod(`${this.gv.userBaseUrl}get_user_list`,
  // {
  //   page: (this.currentPage + 1),
  //   search_by:this.filterValue,
  //   filter_by:{status:['active']},
  //   per_page: this.pageSize,
  //   sort_by: this.tableSortObj.column.toLowerCase(),
  //   order_by: (this.tableSortObj.order).toLowerCase() //toUpperCase()
  // }, (r: any) => {
  //   var res = (r.data) ? r.data : [];
  //   this.totalRows = (r.count) ? (r.count) : this.totalRows;
  //   this.dataTable = res;
  //   // console.log(this.dataTable)
  //   this.data_dataSource = new MatTableDataSource(this.dataTable);
  //   console.log(this.data_dataSource)
  //   this.tableRedraw()
  //   this.apiCall['list']= false;
  // }, (error: any) => { this.apiCall['list']= false; })


  this.apiCall['list']= true
  this.apiService.postMethod(`${this.gv.userBaseUrl}get_client_details`,
  {
    page: (this.currentPage + 1),
    search_by:this.filterValue,
    per_page: this.pageSize,
    sort_by: this.tableSortObj.column.toLowerCase(),
    order_by: (this.tableSortObj.order).toLowerCase()
  },(r: any) => {
    var tableData = []
      r.data.forEach((r)=>{
        tableData.push(
          {
            client_name:r.basic_details.client_name,
            contact_email:r.basic_details.contact_email,
            client_status:r.basic_details.client_status,
            sub_start_date:r.subscription_details.sub_start_date,
            sub_end_date:r.subscription_details.sub_end_date,
            subscription_length:r.subscription_details.length,
            subscription_details:r.subscription_details
          }
        )

        this.data_dataSource = new MatTableDataSource(tableData);
        this.tableRedraw()
      })
      this.apiCall['list']= false;
    }, (error: any) => { this.apiCall['list']= false; })


}

  adduser(){
    this.apiCall['common']= true;

    var req = {
      "basic_details": {
          "client_address": this.userForm.client_address,
          "client_name": this.userForm.client_name,
          "client_status": (this.userForm.client_status)?'active':'inactive',
          "contact_email": this.userForm.contact_email,
          "contact_no": this.userForm.contact_no,
          "contact_person": this.userForm.contact_person,
      },
      "login_details": {
          "config_client_name": this.userForm.client_name,
          "login_url": this.userForm.login_url,
          "logout_url": this.userForm.logout_url,
          "sso_client_id": this.userForm.sso_client_id,
          "login_type": this.userForm.login_type,
      },
      "subscription_details": this.userForm.subscription_details
    }


    if(this.formType=='add'){
      this.apiService.postMethod(`${this.gv.userBaseUrl}add_user_details`, JSON.stringify(req),(r: any) => {
          this.apiCall['common']= false;
        if(r.status_code == 200){
          this.userFormVisible=false;
          this.gv.setApiResPopup({ data: {}, res: { message: r.message, status: "Client",status_code: 200}})
          this.getUserDetails()
        }
      }, (error: any) => { this.apiCall['common']= false; })
    }else if(this.formType=='edit'){
      this.apiService.putMethod(`${this.gv.userBaseUrl}update_user_details`, req,(r: any) => {
          this.apiCall['common']= false;
        if(r.status_code == 200){
          this.userFormVisible=false;
          this.gv.setApiResPopup({ data: {}, res: { message: r.message, status: "Client",status_code: 200 }})
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

  doSelect(e,i){
    this.userForm.subscription_details[i].therapeutic_id = this.list.ta_d.find((o) => o.disease_id == e).therapeutic_id
    this.userForm.subscription_details[i].therapeutic_name = this.list.ta_d.find((o) => o.disease_id == e).therapeutic_name
    this.userForm.subscription_details[i].disease_name = this.list.ta_d.find((o) => o.disease_id == e).disease_name
    // delete this.userForm.subscription_details[i].therapeutic_id
    // delete this.userForm.subscription_details[i].disease_id
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


  getAllTA(){

    this.apiCall['common'] = true;
      this.apiService.postMethod(`${this.gv.userBaseUrl}get_all_therapeutic_area`,
      {"page":1,"per_page":100,"sort_by":"therapeutic_name","order_by":"desc"}
      ,(r: any) => {
        this.apiCall['common'] = false;
        if (r.status_code == 200) {
          var TA = [];
          r.data.forEach((ta) => {
            // var _d = {
            //   name: ta.therapeutic_name,
            //   id: ta.therapeutic_id,
            //   type: 'ta',
            //   childCount: ta.disease_data.length,
            //   _ta: ta,
            // };
            ta.disease_data.forEach((d) => {
              TA.push({...{therapeutic_name:ta.therapeutic_name,therapeutic_id:ta.therapeutic_id},...d});
            });
          });
          // console.log(JSON.stringify(TA))
          this.list.ta_d = TA;
        }
      },
      (error: any) => {
        this.apiCall['common'] = false;
      }
    );
  }

}
