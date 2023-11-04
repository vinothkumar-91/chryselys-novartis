import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from '@angular/material/tree';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface treeNode {
  name: string;
  children?: treeNode[];
}

const TREE_DATA: treeNode[] = [];
@Component({
  selector: 'app-tadisease',
  templateUrl: './tadisease.component.html',
  styleUrls: ['./tadisease.component.css'],
})
export class TADiseaseComponent implements OnInit {
  treeControl = new NestedTreeControl<treeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  therapeuticFrom: any = {
    type: 'addta',
    disease_name: '',
    disease_id: '',
    therapeutic_name: '',
    therapeutic_id: '',
  };

  apiCall = {
    common: false,
    form: false,
    addTA: false,
  };

  TA: any;
  constructor(
    public route: Router,
    private gv: GlobalVariablesService,
    private apiService: ApiServiceService
  ) {
    this.getAllTA()
  }

  getAllTA(){

    this.apiCall['common'] = true;
      this.apiService.postMethod(`${this.gv.userBaseUrl}get_all_therapeutic_area`,
      {"page":1,"per_page":100,"sort_by":"therapeutic_name","order_by":"desc"},(r: any) => {
        this.apiCall['common'] = false;
        if (r.status_code == 200) {
          this.TA = [];
          r.data.forEach((ta) => {
            var _d = {
              name: ta.therapeutic_name,
              id: ta.therapeutic_id,
              type: 'ta',
              childCount: ta.disease_data.length,
              _ta: ta,
            };
            ta.disease_data.forEach((d) => {
              _d['children'] = _d['children'] ? _d['children'] : [];
              _d['children'].push({
                name: d.disease_name,
                type: 'd',
                id: d.disease_id,
                childCount: 0,
                _ta: ta,
                _d: d,
              });
            });
            this.TA.push(_d);
          });
          // console.log(JSON.stringify(this.TA))
          this.dataSource.data = this.TA;
        }
      },
      (error: any) => {
        this.apiCall['common'] = false;
      }
    );
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  hasChild = (_: number, node: treeNode) =>
    !!node.children && node.children.length > 0;

  addTAD() {
    console.log(this.therapeuticFrom);

    var req = {},
      url = '';
    if (this.therapeuticFrom.type == 'addta') {
      req = { therapeutic_area: this.therapeuticFrom.therapeutic_name };
      url = `${this.gv.userBaseUrl}add_therapeutic_details`;

      this.apiCall['addTA'] = true;
      this.apiService.postMethod(
        url,
        req,
        (r: any) => {
          this.apiCall['addTA'] = false;
          if (r.status_code == 200) {
            this.apiCall['form'] = true;
            {setTimeout(() => {this.apiCall['form'] = false;}, 100);}
            this.therapeuticFrom = {
              type: 'addta',
              disease_name: '',
              disease_id: '',
              therapeutic_name: '',
              therapeutic_id: '',
            };
            this.gv.setApiResPopup({
              data: {},
              res: {
                message: r.message,
                status: 'Therapeutic/Disease',
                status_code: 200,
              },
            });
            this.getAllTA()

          }
        },
        (error: any) => {
          this.apiCall['addTA'] = false;
        }
      );
    } else if (this.therapeuticFrom.type == 'updateta') {
      console.log(this.therapeuticFrom)
      url = `${this.gv.userBaseUrl}update_therapeutic_area`;
      req = {
        therapeutic_name: this.therapeuticFrom.therapeutic_name,
        status: 'active',
        therapeutic_id: this.therapeuticFrom.therapeutic_id,
      };
      this.apiCall['addTA'] = true;
      this.apiService.putMethod(
        url,
        req,
        (r: any) => {
          this.apiCall['addTA'] = false;
          if (r.status_code == 200) {
            this.apiCall['form'] = true;
            setTimeout(() => {this.apiCall['form'] = false;}, 100);
            this.therapeuticFrom = {
              type: 'addta',
              disease_name: '',
              disease_id: '',
              therapeutic_name: '',
              therapeutic_id: '',
            };
            this.gv.setApiResPopup({
              data: {},
              res: {
                message: r.message,
                status: 'Therapeutic/Disease',
                status_code: 200,
              },
            });
            this.getAllTA()

          }
        },
        (error: any) => {
          this.apiCall['addTA'] = false;
        }
      );
    } else if (this.therapeuticFrom.type == 'adddisease') {
      url = `${this.gv.userBaseUrl}add_diseases`;
      req = { therapeutic_id: this.therapeuticFrom.therapeutic_id,disease_name: this.therapeuticFrom.disease_name };
      this.apiCall['addTA'] = true;
      this.apiService.postMethod(
        url,
        req,
        (r: any) => {
          this.apiCall['addTA'] = false;
          if (r.status_code == 200) {
            this.apiCall['form'] = true;
            setTimeout(() => {this.apiCall['form'] = false;}, 100);
            this.therapeuticFrom = {
              type: 'addta',
              disease_name: '',
              disease_id: '',
              therapeutic_name: '',
              therapeutic_id: '',
            };
            this.gv.setApiResPopup({
              data: {},
              res: {
                message: r.message,
                status: 'Therapeutic/Disease',
                status_code: 200,
              },
            });
            this.getAllTA()

          }
        },
        (error: any) => {
          this.apiCall['addTA'] = false;
        }
      );
    } else if (this.therapeuticFrom.type == 'updatedisease') {
      url = `${this.gv.userBaseUrl}update_disease_details`;
      req = {
        therapeutic_name: this.therapeuticFrom.therapeutic_name,
        status: 'active',
        disease_name: this.therapeuticFrom.disease_name,
        disease_id: this.therapeuticFrom.disease_id,
      };

      this.apiCall['addTA'] = true;
      this.apiService.putMethod(
        url,
        req,
        (r: any) => {
          this.apiCall['addTA'] = false;
          if (r.status_code == 200) {
            this.apiCall['form'] = true;
            setTimeout(() => {this.apiCall['form'] = false;}, 100);
            this.therapeuticFrom = {
              type: 'addta',
              disease_name: '',
              disease_id: '',
              therapeutic_name: '',
              therapeutic_id: '',
            };
            this.gv.setApiResPopup({
              data: {},
              res: {
                message: r.message,
                status: 'Therapeutic/Disease',
                status_code: 200,
              },
            });
            this.getAllTA()

          }
        },
        (error: any) => {
          this.apiCall['addTA'] = false;
        }
      );
    }

    // console.log(this.apiService);
  }

  addUpdateDisease(ta, formtype) {
    this.apiCall['form'] = true;
    setTimeout(() => {this.apiCall['form'] = false;}, 100);
    // console.log(ta, formtype);
    this.therapeuticFrom.therapeutic_name = ta._ta.therapeutic_name;
    this.therapeuticFrom.therapeutic_id = ta._ta.therapeutic_id;
    if (formtype == 'add') {
      this.therapeuticFrom.type = 'adddisease';
      this.therapeuticFrom.disease_name = '';
      this.therapeuticFrom.disease_id = '';
    } else {
      this.therapeuticFrom.type = 'updatedisease';
      this.therapeuticFrom.disease_name = ta._d.disease_name;
      this.therapeuticFrom.disease_id = ta._d.disease_id;
    }
  }

  addUpdateta(ta) {
    // console.log(ta);
    this.therapeuticFrom.therapeutic_name = ta._ta.therapeutic_name;
    this.therapeuticFrom.therapeutic_id = ta.id;
    this.therapeuticFrom.type = 'updateta';
  }
  currentObj:any={}
  deleteNode(node,type){
    this.currentObj = {...node,type:type};
    this.popuptype = 'nodeDelete';
  }
  popuptype:any='';
  deleteCallback(id:any){
    this.apiCall['addTA']= true;
    var url = (this.currentObj.type=='t')?'delete_therapeutic_area':'delete_disease_details'
    var req = (this.currentObj.type=='t')?{therapeutic_id:this.currentObj.id}:{disease_id:this.currentObj.id}
    this.apiService.postMethod(`${this.gv.userBaseUrl}`+url, req
    ,(r: any) => {
      this.apiCall['addTA'] = false;
      this.popuptype = '';
      if (r.status_code == 200) {
        this.apiCall['form'] = true;
        setTimeout(() => {this.apiCall['form'] = false;}, 100);
        this.therapeuticFrom = {
          type: 'addta',
          disease_name: '',
          disease_id: '',
          therapeutic_name: '',
          therapeutic_id: '',
        };
        this.gv.setApiResPopup({ data: {}, res: { message: r.message, status: "TA",status_code: 200 }})


        this.getAllTA()
      }
    }, (error: any) => { this.apiCall['form']= false; })
  }



}
