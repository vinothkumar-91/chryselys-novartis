import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public route: Router, private gv: GlobalVariablesService,private apiService: ApiServiceService) {
    this.gv.setBreadcrumb({})
  }
  TA:any=[
    // {
    //   therapeutic_name:'psychiatry',isLock:false,
    //   img:'./assets/image/icons/home/psychiatry.svg',
    //   disease_data:[
    //    {disease_name:'MDD',isLock:false,link:'/PIT/Landscape'},
    //    {disease_name:'Major Depressive Disorder',isLock:true,link:'/PIT/Landscape'},
    //    {disease_name:'Bipolar Disorder',isLock:true,link:'/PIT/Landscape'}
    //   ]
    // },
    // {
    //   therapeutic_name:'Neurology',isLock:true,
    //   img:'./assets/image/icons/home/Neurology.svg',
    //   disease_data:[
    //    {disease_name:'Disease 1',isLock:true},
    //   ]
    // },
    // {
    //   therapeutic_name:'Oncology',isLock:true,
    //   img:'./assets/image/icons/home/Oncology.svg',
    //   disease_data:[
    //     {disease_name:'Disease 1',isLock:true},
    //     {disease_name:'Disease 2',isLock:true},
    //   ]
    // },
    // {
    //   therapeutic_name:'Ophthalmology',isLock:true,
    //   img:'./assets/image/icons/home/Oncology.svg',
    //   disease_data:[
    //     {disease_name:'Disease 1',isLock:true},
    //     {disease_name:'Disease 2',isLock:true},
    //     {disease_name:'Disease 3',isLock:true},
    //   ]
    // }
  ]

  apiCall:boolean = false;
  ngOnInit(): void {
    this.apiCall = true;
    this.apiService.postMethod(`${this.gv.userBaseUrl}get_all_therapeutic_area`,
    {"page":1,"per_page":100,"sort_by":"therapeutic_name","order_by":"desc"},(r: any) => {
      this.apiCall = false;
      if (r.status_code == 200) {
        this.TA = []
        r.data.forEach(ta => {
            var _d = []
            ta.disease_data.forEach(d => {
                d['isLock'] = (this.gv.userDetail.ta && this.gv.userDetail.ta[ta.therapeutic_name] && (this.gv.userDetail.ta[ta.therapeutic_name].indexOf(d.disease_name) != -1))?false:true;
                d['link'] = '/PIT/Landscape'
                // d['link'] = '/PIT/Settings/0'
                _d.push(d)
            });
            this.TA.push({therapeutic_name:ta.therapeutic_name,therapeutic_id:ta.therapeutic_id,disease_data:_d,
            img:'./assets/image/icons/home/'+ta.therapeutic_name+'.svg',
            isLock:(this.gv.userDetail.ta.hasOwnProperty(ta.therapeutic_name))?false:true})
      });
      // console.log(this.TA)

      }
    }, (error: any) => { this.apiCall = false;})
    this.gv.scrollTopCommon()
  }


  setTAD(ta:any,d:any){
    // console.log(JSON.stringify({
    //   TA: ta,D:d
    // }))
    this.gv.portal['TAD'] = {
      TA: ta,D:d
    }


    if(!d.isLock){this.route.navigateByUrl(d.link);}else{
      this.gv.setApiResPopup({ data: {}, res: { message: "This feature is not available for you. Please contact our support team.", status: "ACCESS DENIED" } })
    }
    // this.route.navigateByUrl('/PIT/REDPLANUP');
  }
}
