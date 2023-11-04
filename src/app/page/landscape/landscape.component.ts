import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { BarChart,PieChart,LineChart } from "echarts/charts";

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from '../../api-service.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { EChartsOption } from 'echarts'; // Import EChartsOption
// import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.css']
})
export class LandscapeComponent implements OnInit {
  readonly echartsExtentions: any[]=[
    PieChart,LineChart,
    BarChart,
    TooltipComponent,
    GridComponent,
    LegendComponent];

  totalRows: any = 0
  pageSizeOptions: any = [5, 10, 20]
  filterValue: any = ''
  tableSortObj: any = { column: 'nct_id', order: 'desc' }
  pageSize: any = 5;
  currentPage = 0;

      //   filter_by:{"ta":["psychiatry"],"disease_area":["MDD"]},
      //   page: this.currentPage,
      //   // offset: this.currentPage * this.pageSize,
      //   // filter: this.filterValue,
      //   per_page: this.pageSize,
      //   sort_by: this.tableSortObj.column.toLowerCase(),
      //   order_by: (this.tableSortObj.order).toLowerCase() //toUpperCase()

  popuptype: any = '';
  data_dataSource: any=new MatTableDataSource([]);
  dataTable: any = [];
  apiCall: any = {
    header:true,
    studyStatus:true,
    trialsPhase:true,
    trialsSponsor:true,
    patientEnrollment:true,
    paymentBySponsors:true,
    landscapeFilter:true,
    trialDetails:true,
    filtering:false
  };
  landscapeDash:any = {
    header:{},
    studyStatus:{},
    trialsPhase:{},
    trialsSponsor:{},
    patientEnrollment:{},
    paymentBySponsors:{},
    landscapeFilter:{},
    trialDetails:[]
  }


  detailView: boolean = false; currentObj: any = {};
  displayedColumns_order = [
    "nct_id",
    "acronym",
    "study_status",
    "condition",
    "interventions",
    "phase",
    "sponsor",
    "start_date"
  ];

  @ViewChild(MatPaginator) data_paginator!: MatPaginator | null;
  @ViewChild(MatSort) data_sort!: MatSort | null;

  sponserlist:any=[
    {name:'Otsuka',val:30,per:'30%'},
    {name:'Janssen',val:30,per:'20%'},
    {name:'Stemline',val:30,per:'15%'},
    {name:'Otsuka',val:30,per:'30%'},
    {name:'Janssen',val:30,per:'20%'},
    {name:'Stemline',val:30,per:'15%'},
    {name:'Otsuka',val:30,per:'30%'},
    {name:'Janssen',val:30,per:'20%'},
    {name:'Stemline',val:30,per:'15%'},
  ]
  constructor(private datePipe: DatePipe, route: ActivatedRoute, private router: Router, private http: HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService) {
    this.echartsExtentions = [
      PieChart,LineChart,
      BarChart,
      TooltipComponent,
      GridComponent,
      LegendComponent
    ];


   }
  trialsPhaseOption:any = {
    height: 250,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      top: "3%",
      containLabel: true
    },
    xAxis: {
      // data: ['Easy 1', '1', '1/2', '2', '2/3', '3']
    },
    yAxis: {
      axisLabel: {
        formatter:  function (params){
          return  params
        },
      },
      type: 'value',
      splitLine:{ show: true, lineStyle: {
        color: '#f7f7f7'
      } },
      axisLine: { show: false },
      axisTick: { show: false },
      // axisLabel: { show: false }
    },
    legend: {
      data: [],
      bottom: 0
    },
    series: [
      {
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 3,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'top',
          color: '#333',
          formatter: '{c}',
          valueAnimation: true
        },
        name: 'sales',
        type: 'bar',
        showBackground: true,
        data: [
          // {
          //   value: 20,
          //   itemStyle: {
          //     color: '#62B2DB'
          //   }
          // },
          // {
          //   value: 30,
          //   itemStyle: {
          //     color: '#4092BC'
          //   }
          // },
          // {
          //   value: 25,
          //   itemStyle: {
          //     color: '#115B80'
          //   }
          // },
          // {
          //   value: 45,
          //   itemStyle: {
          //     color: '#26769F'
          //   }
          // },
          // {
          //   value: 12,
          //   itemStyle: {
          //     color: '#26769F'
          //   }
          // },
          // {
          //   value: 16,
          //   itemStyle: {
          //     color: '#4092BC'
          //   }
          // },
        ]
      }]
  };






  chartOption2:any = {
    title: {
      // text: 'test',
      left: 'center',
      textStyle: {
        color: '#999',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    series: [
    ////////////////////////////////////////
    [
      { name: 'Completed', value: 5.6 },
      { name: 'Recruiting', value: 1 },
      { name: 'Active not recruiting', value: 0.8 },
      { name: 'Terminated', value: 0.5 },
      { name: 'Withdrawn', value: 0.5 },
      { name: 'Suspended', value: 3.8 },
      { name: 'Not Recruiting', value: 1.8 }
    ]
  ].map(function (data, idx) {
      var top = idx * 33.3;
      return {
        type: 'pie',
        radius: [20, 60],
        top: top + '%',
        height: '33.33%',
        left: 'center',
        width: 100,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          alignTo: 'edge',
          formatter: '{name|{b}}\n{time|{c}}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < 100 / 2;
          const points = params.labelLinePoints;
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points
          };
        },
        data: data
      };
    })
  };

  barChartPhases2: EChartsOption = this.chartOption2

//   studyStatusOption:any = {
//     color: this.gv.chartColor,
//     // height: 200,
//     tooltip : {
//         trigger: 'item',
//         formatter: "{a} <br/>{b} : {c} ({d}%)"
//     },
//     legend: {
//         orient : 'vertical',
//         // x : 'right',
//         right: 10,
//         top: 'center'
//         // data:['a1','test2','test3','test4','tes5']
//     },
//     // toolbox: {
//     //     show : true,
//     //     feature : {
//     //         mark : {show: true},
//     //         dataView : {show: true, readOnly: false},
//     //         magicType : {
//     //             show: true,
//     //             type: ['pie', 'funnel'],
//     //             option: {
//     //                 funnel: {
//     //                     x: '25%',
//     //                     width: '50%',
//     //                     funnelAlign: 'center',
//     //                     max: 1548
//     //                 }
//     //             }
//     //         },
//     //         restore : {show: true},
//     //         saveAsImage : {show: true}
//     //     }
//     // },
//     // calculable : true,

//     series : [
//         {
//             name:'Study Status',
//             type:'pie',
//             top: '0%',
//             height: '100%',
//             left: '-40%',
//             radius : ['50%', '90%'],
//             itemStyle : {
//                 normal : {
//                      label : {
//                         show: true, position: 'inner',color:'#fff',
//                         formatter : function (params){
//                               return  params.value + '%\n'
//                         },
//                     },
//                     labelLine : {
//                         show : false
//                     }
//                 },
//                 emphasis : {
//                     label : {
//                         show : false,
//                         position: 'inner',
//                         // formatter : function (params){
//                         //       return  params.value + '%\n'
//                         // },
//                     }
//                 }
//             },
//             data:[ { name: 'Completed', value: 22 },
//             { name: 'Recruiting', value: 9 },
//             { name: 'Active not recruiting', value: 16 },
//             { name: 'Terminated', value: 25 },
//             { name: 'Withdrawn', value: 28 },
//             { name: 'Suspended', value: 12 },
//             { name: 'Not Recruiting', value: 4 }
//             ]
//         }
//     ]
// };

// pieChartStudyStatus:EChartsOption = this.studyStatusOption
barChartPhases: EChartsOption = this.trialsPhaseOption



@ViewChild('multiSelect') multiSelect;
// public formGroup: FormGroup;
public loadContent: boolean = false;
public name = 'Cricketers';
public data = [];
public settings = {};
public selectedItems = [];


  ngOnInit(): void {
    this.gv.scrollTopCommon()

    this.loadFilterResponse()
    // this.studyStatusOption['color'] = this.gv.chartColor;
    // this.barChartPhases['color'] = this.gv.chartColor;


    this.loadData()


    //console.log(this.gv.encryptData('xIdlSzju9TAp'))

    this.gv.setHeaderTitle('Landscape')

    this.data = [
      // 'Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi','Hanoi'
      { item_id: 1, item_text: 'item 1' },
      { item_id: 2, item_text: 'item 2' },
      { item_id: 3, item_text: 'item 3' },
      { item_id: 4, item_text: 'item 4' },
      { item_id: 5, item_text: 'item 5' },
    ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: false,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Select',
      noDataAvailablePlaceholderText: 'No Data Found',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.setForm();
  }

  public setForm() {
    // this.formGroup = new FormGroup({
    //   name: new FormControl(this.data, Validators.required),
    // });
    this.loadContent = true;
  }


  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }

  public onFilterChange(item: any) {
    // console.log(item);
  }
  public onDropDownClose(item: any) {
    // console.log(item);
  }

  public onItemSelect(item: any) {
    // console.log(item);
    // this.loadFilterResponse()
  }
  public onDeSelect(item: any) {
    // console.log(item);
    // this.loadFilterResponse()
  }

  public onSelectAll(items: any) {
    // console.log(items);
  }
  public onDeSelectAll(items: any) {
    // console.log(items);
  }

  landscapeFilterVal:any={
    condition:[],
    nct_id:[],
    phase:[],
    sponsor:[],
    start_date:[],
    study_status:[],
  }
  filterList:any={}

  filters:any= [
    {name:'condition',id:'condition'},
    {name:'nct_id',id:'nct_id'},
    {name:'phase',id:'phase'},
    {name:'sponsor',id:'sponsor'},
    {name:'start_date',id:'start_date'},
    {name:'study_status',id:'study_status'},
  ]

resetAll(){
  this.landscapeFilterVal={ condition:[], nct_id:[], phase:[], sponsor:[], start_date:[], study_status:[]}
}

loadFilterResponse(){

  this.apiCall['landscapeFilter'] = true;
  this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_filters`,
  {},
  // this.getlandscapeFilterVal,
  (r: any) => {
    var res = (r.data) ? r.data : [];
    if(r.status_code==200){
      this.filterList=res
      // this.loadData()
    }
    this.apiCall['landscapeFilter'] = false;
  }, (error: any) => { this.apiCall['landscapeFilter'] = false; })



}

  get getlandscapeFilterVal(){
    // console.log(this.landscapeFilterVal)
    if(!this.landscapeFilterVal.condition || this.landscapeFilterVal.condition.length==0)
      delete this.landscapeFilterVal.condition
    if(!this.landscapeFilterVal.nct_id || this.landscapeFilterVal.nct_id.length==0)
      delete this.landscapeFilterVal.nct_id
    if(!this.landscapeFilterVal.phase || this.landscapeFilterVal.phase.length==0)
      delete this.landscapeFilterVal.phase
    if(!this.landscapeFilterVal.sponsor || this.landscapeFilterVal.sponsor.length==0)
      delete this.landscapeFilterVal.sponsor
    if(!this.landscapeFilterVal.start_date || this.landscapeFilterVal.start_date.length==0)
      delete this.landscapeFilterVal.start_date
    if(!this.landscapeFilterVal.study_status || this.landscapeFilterVal.study_status.length==0)
      delete this.landscapeFilterVal.study_status

    if(
      this.landscapeFilterVal.condition && this.landscapeFilterVal.condition.length==0 &&
      this.landscapeFilterVal.nct_id && this.landscapeFilterVal.nct_id.length==0 &&
      this.landscapeFilterVal.phase && this.landscapeFilterVal.phase.length==0 &&
      this.landscapeFilterVal.sponsor && this.landscapeFilterVal.sponsor.length==0 &&
      this.landscapeFilterVal.start_date && this.landscapeFilterVal.start_date.length==0 &&
      this.landscapeFilterVal.study_status && this.landscapeFilterVal.study_status.length==0
    ){
      return {}
    }else{
      return (this.landscapeFilterVal === {})?{}:{"filter_by":this.landscapeFilterVal}
    }
  }
  submitFilter(){
    // console.log(this.landscapeFilterVal)
    this.apiCall['filtering'] = true;
    this.apiCall['header'] = true;
    this.apiCall['studyStatus'] = true;
    this.apiCall['trialsPhase'] = true;
    this.apiCall['trialsSponsor'] = true;
    this.apiCall['patientEnrollment'] = true;
    this.apiCall['trialDetails'] = true;
    this.loadData()
  }

  loadTableData() {
    this.apiCall['trialDetails'] = true;
    // this.data_dataSource = new MatTableDataSource([]);
    this.apiService.postMethod(`${this.gv.baseUrl}get_trial_details`,
      {
        ...this.getlandscapeFilterVal,
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
        this.apiCall['trialDetails'] = false;
      }, (error: any) => { this.apiCall['trialDetails'] = false; })
  }

  loadData() {







    this.loadTableData();

      // this.apiService.postMethod(`${this.gv.baseUrl}get_investigator_details`,
      // {
      //   filter_by:{"ta":["psychiatry"],"disease_area":["MDD"]}
      // }, (r: any) => {
      //   var res = (r.data) ? r.data : [];
      //   //console.log(res)
      //   this.apiCall['trialDetails'] = false;
      // }, (error: any) => { this.apiCall['trialDetails'] = false; })

      // trialsPhase:false,
      // patientEnrollment:false,
      // paymentBySponsors:false


      this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_header`,
      {
        ...this.getlandscapeFilterVal,
      }, (r: any) => {
        var res = (r.data) ? r.data : [];
        //console.log(res)
        this.landscapeDash['header'] = res
        this.apiCall['header'] = false;
      }, (error: any) => { this.apiCall['header'] = false; })


      this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_by_func?function=study_status`,
      {
        function:"study_status",
        ...this.getlandscapeFilterVal,
      }, (r: any) => {
        var res = (r.data) ? r.data : [];
        this.landscapeDash['studyStatus'] = res.map(function (obj) {
          obj['value'] = obj['count'];
          obj['name'] = obj['study_status'];
          return obj;
        });


        // this.landscapeDash['studyStatus'] = this.pieChartStudyStatus;

        // //console.log(this.landscapeDash['studyStatus'])
        this.apiCall['studyStatus'] = false;
      }, (error: any) => { this.apiCall['studyStatus'] = false; })

      this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_by_func?function=phase`,
      {
        function:"phase",
        ...this.getlandscapeFilterVal,
      }, (r: any) => {
        var res = (r.data) ? r.data : [];
        //console.log(res)
        var xaxis = [],newObj = []
        res.forEach(obj => {
          var _obj = {itemStyle: {color: '#62B2DB'}}
          _obj['value'] = obj['count'];
          // newObj['name'] = obj['phase'];
          //console.log(obj)
          // xaxis.push(obj['key'])
          xaxis.push(obj['phase'])
          newObj.push(_obj)
        });

        this.barChartPhases.series[0].data = newObj
        this.barChartPhases.xAxis= {data: xaxis,type: 'category',axisLabel: { interval: 0, rotate: 30 }}

        this.landscapeDash['trialsPhase'] = this.barChartPhases;

        this.apiCall['trialsPhase'] = false;
      }, (error: any) => { this.apiCall['trialsPhase'] = false; })


      this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_by_sponsor?function=trails`,
      {
        function:"trails",
        sort_by:"desc",
        // top:10,
        ...this.getlandscapeFilterVal,
      }, (r: any) => {
        var res = (r.data) ? r.data : [];
        //console.log(res)
        this.landscapeDash['trialsSponsor'] = res
        this.apiCall['trialsSponsor'] = false;
      }, (error: any) => { this.apiCall['trialsSponsor'] = false; })

      this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_by_sponsor?function=enrl`,
      {
        function:"enrl",
        sort_by:"desc",
        top:5,
        ...this.getlandscapeFilterVal,
      }, (r: any) => {
        var res = (r.data) ? r.data : [];
        //console.log(res)
        this.landscapeDash['patientEnrollment'] = res
        this.apiCall['patientEnrollment'] = false;
      }, (error: any) => { this.apiCall['patientEnrollment'] = false; })


      this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_by_sponsor?function=payment`,
      {
        function:"payment",
        sort_by:"desc",
        top:5,
        // ...this.getlandscapeFilterVal,
      }, (r: any) => {
        var res = (r.data) ? r.data : [];
        var _chartObj = {legendData:[],xAxisData:[],series:[]}
        res.forEach(obj => {
          _chartObj.legendData.push(obj['name']);
          var _obj = {}
          obj['values'].forEach(v => {
            _obj[v.year] = (v.payment).replace("k","")
          });
          _chartObj.xAxisData = (Object.keys(_obj));
          _chartObj.series.push(
          {
            symbol: 'circle',
            symbolSize: 1,
            name: obj['name'],
            type: 'line',
            stack: 'Total',
            data: Object.values(_obj)
          })
        });


        var chartObj = {legendData:[],yAxisData:[],series:[]}
        res.forEach(obj => {
          chartObj.legendData.push(obj['name']);
          var _obj = {}
          obj['values'].forEach(v => {
            _obj[v.year] = (v.payment).replace("k","")
          });
          chartObj.yAxisData = (Object.keys(_obj));
          chartObj.series.push(
            {
              name: obj['name'],
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                color: '#fff',
                formatter: '{c}K',
                valueAnimation: true
              },
              emphasis: {
                focus: 'series'
              },
              data: Object.values(_obj)
          })
        });

        this.landscapeDash['paymentBySponsors'] = {...chartObj,...{_chartObj:_chartObj}};
        // //console.log(chartObj)
        this.apiCall['paymentBySponsors'] = false;
      }, (error: any) => { this.apiCall['paymentBySponsors'] = false; })
      // this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_by_sponsor`,
      // {
      //   filter_by:{"ta":["psychiatry"],"disease_area":["MDD"]}
      // }, (r: any) => {
      //   var res = (r.data) ? r.data : [];
      //   //console.log(res)
      //   this.apiCall['trialsSponsor'] = false;
      // }, (error: any) => { this.apiCall['trialsSponsor'] = false; })


      // this.apiService.postMethod(`${this.gv.baseUrl}get_dashboard_by_sponsor`,
      // {
      //   filter_by:{"ta":["psychiatry"],"disease_area":["MDD"]}
      // }, (r: any) => {
      //   var res = (r.data) ? r.data : [];
      //   //console.log(res)
      //   this.apiCall['trialsSponsor'] = false;
      // }, (error: any) => { this.apiCall['trialsSponsor'] = false; })



  }

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










  filterObj:any={
    nctid:null
  }

  list:any=[{name:'name1'},{name:'name1'},{name:'name1'},{name:'name1'},{name:'name1'},{name:'name1'}]
  filterSubmit(){


  }



}
