import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {

  data:any={
    config:'',
    org:{},
  }
  config:any = {multi: false}
  apiCall:any = {
    config:false,
    org:false,
  };


  constructor(public route: Router, private gv: GlobalVariablesService,private apiService: ApiServiceService, private authService: AuthService) {

    this.apiCall['org'] = true;
    this.apiService.getMethod(`${this.gv.userBaseUrl}get_organisation_details`, (r: any) => {
      this.apiCall['org'] = false;
      if (r.status_code == 200) {
        this.data['org'] = r.data
        // console.log(r)


        this.apiCall['config'] = true;
        this.apiService.getMethod(`${this.gv.userBaseUrl}get_config_details?organisation_id=`+this.data['org'].organisation_id, (r: any) => {
          this.apiCall['config'] = false;
          if (r.status_code == 200) {
            this.data['config'] = r.data

            this.filterList = {
              Study:this.data['config']['Practice_Setting'],
              Speciality:this.data['config']['Select Study'],
              Practice:this.data['config']['Speciality'],
            }
          }
        }, (error: any) => {this.apiCall['config'] = false;})

      }
    }, (error: any) => {this.apiCall['org'] = false;})



  }
  ngOnInit(): void {
    this.menus =[
      {
        name: 'Today',
        active: true,
        submenu: [
          { name: 'How to write an impacting',active:true},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
        ]
      },
      {
        name: 'Last Week',
        active: true,
        submenu: [
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
          { name: 'How to write an impacting'},
        ]
      }
    ];
  }
  menus:any=  []
  filterList = {
    Study:['Study1','Study2'],
    Speciality:['Speciality1','Speciality2'],
    Practice:['Practice1','Practice2'],
  }

  filterVal={
    Study:'',
    Speciality:'',
    Practice:'',
  }
  filters:any= [
    {name:'Study',id:'Study'},
    {name:'Speciality',id:'Speciality'},
    {name:'Practice Setting',id:'Practice'},
  ]
  settings = {
    singleSelection: true,
    // idField: 'item_id',
    // textField: 'item_text',
    // enableCheckAll: true,
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    allowSearchFilter: false,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: 197,
    itemsShowLimit: 1,
    searchPlaceholderText: 'Select',
    noDataAvailablePlaceholderText: 'No Data Found',
    closeDropDownOnSelection: false,
    showSelectedItemsAtTop: false,
    defaultOpen: false,
  };
  toggle(index: number) {
    // if (!this.config.multi) {
    //   this.menus.filter((menu, i) => i !== index && menu.active).forEach(menu => menu.active = !menu.active);
    // }
    this.menus[index].active = !this.menus[index].active;
  }


  public logout() {
    this.authService.logOut();
  }
}
