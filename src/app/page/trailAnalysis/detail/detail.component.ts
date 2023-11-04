import { Component, OnInit } from '@angular/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { EChartsOption } from 'echarts';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { ApiServiceService } from 'src/app/api-service.service';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
// import { MapMarker, GoogleMap, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {


  readonly echartsExtentions: any[];

  // sponserlist:any=[
  //   {name:'Otsuka',val:30,per:'30%'},
  //   {name:'Janssen',val:30,per:'20%'},
  //   {name:'Stemline',val:30,per:'15%'},
  //   {name:'Otsuka',val:30,per:'30%'},
  //   {name:'Janssen',val:30,per:'20%'},
  //   {name:'Stemline',val:30,per:'15%'},
  //   {name:'Otsuka',val:30,per:'30%'},
  //   {name:'Janssen',val:30,per:'20%'},
  //   {name:'Stemline',val:30,per:'15%'},
  // ]
  option3:any = {
    color: ["#C98B27","#004567"],
    height: 150,
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} :  ({d}%)"
    },
    legend: {
        orient : 'vertical',
        right: 10,
        top: 'center'
    },
    series : [
        {
            name:'Study Status',
            type:'pie',
            top: '0%',
            height: '90%',
            left: '-30%',
            radius : ['40%', '100%'],
            itemStyle : {
                normal : {
                     label : {
                        show: true, position: 'inner',color:'#fff',

                        formatter : function (params){
                              return  params.value + '%\n'
                        },
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : false,
                        position: 'inner',
                        // formatter : function (params){
                        //       return  params.value + '%\n'
                        // },
                    }
                }
            },
            data:[ { name: 'Exc-US', value: 60 },
            { name: 'US', value: 40 },
            ]
        }
    ]
};

PIoption:any = {
  color: ["#9EC67E","#F8777E"],
  height: 150,
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient : 'vertical',
      right: 10,
      top: 'center'
  },
  series : [
      {
          name:'Study Status',
          type:'pie',
          top: '0%',
          height: '90%',
          left: '-30%',
          radius : ['40%', '100%'],
          itemStyle : {
              normal : {
                   label : {
                      show: true, position: 'inner',color:'#fff',
                      formatter : function (params){
                            return  params.value + '%\n'
                      },
                  },
                  labelLine : {
                      show : false
                  }
              },
              emphasis : {
                  label : {
                      show : false,
                      position: 'inner',
                      // formatter : function (params){
                      //       return  params.value + '%\n'
                      // },
                  }
              }
          },
          data:[ { name: 'Exc-US', value: 60 },
          { name: 'US', value: 40 },
          ]
      }
  ]
};

pieChartStudyStatus:EChartsOption = this.option3
pieChartPI:EChartsOption = this.PIoption

// public markers: any[];
// public zoom: number;
id:any;back:any;
constructor(private apiService: ApiServiceService,private gv: GlobalVariablesService, public route: ActivatedRoute) {


    this.id = this.route.snapshot.params['id'];
    this.back = this.route.snapshot.params['back'];
  // this.markers = [];
  // this.zoom = 2;
    this.echartsExtentions = [
      PieChart,LineChart,
      BarChart,
      TooltipComponent,
      GridComponent,
      LegendComponent
    ]; }

  ngOnInit(): void {

      this.gv.scrollTopCommon()
      this.loadData()

    this.gv.setHeaderTitle('Trial Analysis')
  }

  apiCall:any={
    sites_by_country:true,
    pi_by_rec_status:true,
    payment_accross_pi:true,
    basic:true
  }

  detailView:any={
    sites_by_country:true,
    pi_by_rec_status:true,
    payment_accross_pi:true,
    basic:{actual_primary_completion_date:"",anticipated_primary_completion_date:"",study_status:"",condition:"",interventions:"",phase:"",sponsor:"", start_date:"",brief_title:"",acronym:"",actual_enrollment:""}
  }

  loadData(){
    // console.log(this.id)


    this.apiService.postMethod(`${this.gv.baseUrl}get_trial_details`,
    {
      page: 1,search_by: this.id,per_page: 1,sort_by: 'nct_id',order_by: 'desc'
    }, (r: any) => {
      var res = (r.data) ? r.data[0] ? r.data[0] : this.detailView.basic : this.detailView.basic;
      // this.detailView.basic = {...res,...{actual_enrollment:70,anticipated_enrollment_max:30}};
      this.detailView.basic = res
      this.apiCall['basic'] = false;

    }, (error: any) => { this.apiCall['basic'] = false; })



    this.apiService.postMethod(`${this.gv.baseUrl}get_data_by_nct_id?function=sites_by_country`,
    {
        // "filter_by":{"ta":["psychiatry"],"disease_area":["MDD"]},
        "nct_id":this.id,view:"sites_by_country"
    }, (r: any) => {

      if(r.data && r.data.length!=0){
        var res = r.data[0]
        this.detailView['sites_by_country'] = true
        this.pieChartStudyStatus.series[0].data = [ { name: 'Ex-US '+res.us_sites, value: res.us_sites },{ name: 'US '+(100-res.us_sites), value: (100-res.us_sites) },]
      }else{
        this.detailView['sites_by_country'] = false
      }
      console.log(res)
    //   this.detailView['sites_by_country'] = res.map(function (obj) {
    //     obj['value'] = obj['count'];
    //     obj['name'] = obj['study_status'];
    //     return obj;
    //   });
      this.apiCall['sites_by_country'] = false;
    }, (error: any) => { this.apiCall['sites_by_country'] = false; })




    this.apiService.postMethod(`${this.gv.baseUrl}get_data_by_nct_id?function=pi_by_rec_status`,
    {
        "nct_id":this.id,view:"pi_by_rec_status"
    }, (r: any) => {

      if(r.data && r.data.length!=0){
        var res = r.data[0]
        this.detailView['pi_by_rec_status'] = true
        this.pieChartPI.series[0].data = [ { name: 'Successful', value: res.success_percentage },{ name: 'Unsuccessful', value: (100-res.success_percentage) },]
      }else{
        this.detailView['pi_by_rec_status'] = false
      }


      // this.detailView['pi_by_rec_status'] = res;
      // console.log(res)
      this.apiCall['pi_by_rec_status'] = false;
    }, (error: any) => { this.apiCall['pi_by_rec_status'] = false; })

    this.apiService.postMethod(`${this.gv.baseUrl}get_data_by_nct_id?function=payment_accross_pi`,
    {
        "nct_id":this.id,view:"payment_accross_pi"
    }, (r: any) => {
      if(r.data && r.data.length!=0){
        var res = r.data
        this.detailView['payment_accross_pi'] = res;
      }else{
        this.detailView['payment_accross_pi'] = [];
      }
      this.apiCall['payment_accross_pi'] = false;
    }, (error: any) => { this.apiCall['payment_accross_pi'] = false; })


    // this.apiService.postMethod(`${this.gv.baseUrl}get_investigator_details`, {"page":1,"per_page":10,"order_by":"desc","sort_by":"nct_id"}, (r: any) => {
    //   var res = (r.data) ? r.data : [];
    //   this.detailView['get_investigator_details'] = res;
    //   console.log(res)
    //   this.apiCall['get_investigator_details'] = false;
    // }, (error: any) => { this.apiCall['get_investigator_details'] = false; })



  }


}

