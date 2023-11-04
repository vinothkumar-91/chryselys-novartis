import { Component, OnInit } from '@angular/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { EChartsOption } from 'echarts';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { ApiServiceService } from 'src/app/api-service.service';
import { BarChart, LineChart, PieChart } from 'echarts/charts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class REDPLANUPDetails implements OnInit {
  id: any;
  overallOption:any = {val1:0,val2:0};

  apiCall: any = {
    detailView: false,
  };
  currentObj: any = {
    // investigator_name: 'eric j kemmerer',
    // npi: 1891056644,
    // prvdr_address_1: '1000 e mountain blvd',
    // prvdr_address_2: null,
    // prvdr_city: 'wilkes barre',
    // prvdr_credentials: 'md',
    // prvdr_gender: 'm',
    // prvdr_specialty: 'RADIATION ONCOLOGY',
    // prvdr_state: 'pa',
    // prvdr_zip_code: '18711',
  };
  detailView: any = {
    // age65_74: 82.0,
    // age75_84: 58.0,
    // age_greaterthan_84: 34.0,
    // age_less_than_65: 23.0,
    // asian: 0.6100000000000001,
    // avg_patient_age: 74.0,
    // black: 2.0600000000000005,
    // hispanic: 2.0000000000000004,
    // native_indian: 0.09000000000000001,
    // npi: 1548370919,
    // others1: 1.9700000000000004,
    // prvdr_gender: 'm',
    // white: 93.27,
  };

  constructor(
    private apiService: ApiServiceService,
    private gv: GlobalVariablesService,
    public route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.gv.scrollTopCommon();
    this.loadData();

    this.gv.setHeaderTitle('REDPLANUP')
  }

  getChartVal(val){
    return {val1:val,val2:(100-val)}
  }
  loadData() {
    // this.apiService.postMethod(
    //   `${this.gv.baseUrl}get_redplanup_details`,
    //   {
    //     page: 1,
    //     search_by: this.id,
    //     per_page: 1,
    //     sort_by: 'npi',
    //     order_by: 'desc',
    //   },
    //   (r: any) => {
    //     this.currentObj = r.data
    //       ? { ...this.currentObj, ...r.data }
    //       : this.currentObj;
    //     this.apiCall['currentObj'] = false;
    //   },
    //   (error: any) => {
    //     this.apiCall['currentObj'] = false;
    //   }
    // );

    this.apiCall['detailView'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_redplanup_data_by_npi?npi=${this.id}`, //
      (r: any) => {
        this.detailView = (r.data)?r.data[0]:{}
          ? { ...this.currentObj, ...r.data }
          : this.detailView;

          this.detailView.race_ethnicity = [
            {name:'White',val:this.detailView.white},
            {name:'Hispanic',val:this.detailView.hispanic},
            {name:'Native Indian',val:this.detailView.native_indian},
            {name:'Asian',val:this.detailView.asian},
            {name:'Black',val:this.detailView.black},
            {name:'Others',val:this.detailView.others}
          ]
        this.apiCall['detailView'] = false;
      },
      (error: any) => {
        this.apiCall['detailView'] = false;
      }
    );
  }
}
