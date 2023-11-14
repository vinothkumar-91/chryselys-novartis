import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap, distinctUntilChanged, map, throttleTime } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../environments/environment';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as XLSX from 'xlsx';

// import * as CryptoJS from 'crypto-js';
import * as bcrypt from "bcryptjs";
import { MatTableExporterDirective } from 'mat-table-exporter';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  apiCalls: any[] = [];
  commonPopup: any = []; commonApiResPopup: any = [];
  portalData = { portalId: 0, userId: 0, portalKey: '', createdDate: 0, portalDetailAvailable: false, portalKeyAvailable: false };
  userBaseUrl =
    (window.location.href.indexOf("localpc") == -1) ?
      (window.location.origin.indexOf("localhost") != -1) ?
        "http://localhost:82/" : "http://localhost" + ":82/" : "http://localhost:82/";
  baseUrl =
    (window.location.href.indexOf("localpc") == -1) ?
      (window.location.origin.indexOf("localhost") != -1) ?
        "http://localhost:82/" : "http://localhost" + ":82/" : "http://localhost:82/";



  // samlURL = 'http://test.chryselys.com:81/login';
  samlURL =  "http://localhost:81/login" //window.location.origin+'/login';

  apidatas: any = { success: [], error: [] };
  isLocal: boolean = (window.location.origin.indexOf("localhost") != -1) ? true : false;
  portal: any = {
  }
  exportDatetime = '';
  pageaccess: any = {
    "super-admin": ['Home','Settings'],
    "admin": ['Home','Settings'],
    "viewer": ['Home','Settings']
  }
  menuList: any = {
    "super-admin": [
      { routerLink: "/Home", src: '', dataPageActive: "Home", name: "Home" ,linetype:'stroke' },
    ],

    "admin": [
      { routerLink: "/Home", src: '', dataPageActive: "Home", name: "Home" ,linetype:'stroke' },
    ],

    "viewer": [
      { routerLink: "/Home", src: '', dataPageActive: "Home", name: "Home" ,linetype:'stroke' },
    ],
  }

  GloaderBtn: any=false;
  Gloader: any = { val: 'false', msg: '' }; currentpage: any = null;
  private defaultToken = new BehaviorSubject<string>('');
  defaultToken$ = this.defaultToken.asObservable();

  passpattern = "(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#&()–{}:;,/*~$^+=<>]).{10,100}"
  urlpattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  get userDetail() {
    // var data = this.userDetails
    var data = localStorage.getItem('log')?JSON.parse(localStorage.getItem('log')|| '{}'):null;
    return data;
  }

  get gv() { return this; }
  get portalDetail() { return this.portal; }
  get GloaderGet() { return this.Gloader; }
  get GloaderBtnGet() { return this.GloaderBtn; }
  GloaderSet(val: any, msg: any) {
    // console.log(val)
    this.Gloader = { val: String(val), msg: msg };
  }
  GloaderBtnSet(val: any, msg: any) {
    // console.log(val)
    this.GloaderBtn = { val: String(val), msg: msg };
  }


  get ispageaccess() {
    // console.log(this.userDetail['role'],this.currentpage,this.pageaccess[this.userDetail['role']])
    // console.log(!(this.pageaccess[this.userDetail['role']].indexOf(this.currentpage) == -1))
    try {
      return !(this.pageaccess[this.userDetail['role']].indexOf(this.currentpage) == -1)
    } catch (error) {
      return false
    }
  }

  setUserDetail(u: any) {
    // ud['role'] = ud['role']?ud['role']:'ADMIN';
    // this.userDetails = ud;
    localStorage.setItem('log',JSON.stringify(u.data))
  }

  clearSession() {
    localStorage.removeItem('log');
  }

  Clog(data: any) {
    //console.log('%c '+data, 'background: #925304; color: #FFFFFF');
  }

  scrollToTop(ele: any) {
    const el = ele.elementRef.nativeElement;
    const duration = 300;
    const interval = 5;
    const move = el.scrollTop * interval / duration;
    //console.log(el.scrollTop)
    observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, el.scrollTop),
      tap(position => el.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }

  scrollTopCommon(){
      const el = document.getElementsByClassName('mat-drawer-content')[0];
      // const el = ele.elementRef.nativeElement;
      const duration = 500;
      const interval = 5;
      const move = el.scrollTop * interval / duration;
      //console.log(el.scrollTop)
      observableInterval(interval).pipe(
        scan((acc, curr) => acc - move, el.scrollTop),
        tap(position => el.scrollTop = position),
        takeWhile(val => val > 0)).subscribe();
  }

  getcommonpopup() { return this.commonPopup; }
  updatecommonpopup(obj: any) { this.commonPopup = obj }
  setcommonpopup(obj: any) {
    const arrayv = Object.assign({}, {
      req: (obj.data.req_data == undefined) ? "" : JSON.stringify(obj.data.req_data),
      header: JSON.stringify(obj.data.headers),
      type: obj.data.type,
      method: obj.data.method,
      url: obj.data.url, //(obj.data.url).toString().replace(`${this.baseUrl}`,""),
      res: obj.res
    })
    this.commonPopup.push(arrayv)
  }

  // get env() {
  //   return environment.env;
  // }





  getApiResPopup() {
    return this.commonApiResPopup;
  }
  updateApiResPopup(obj: any) { this.commonApiResPopup = obj }

  setApiResPopup(obj: any) {
    const arrayv = Object.assign({}, {
      req: (obj.data.req_data == undefined) ? "" : JSON.stringify(obj.data.req_data),
      header: JSON.stringify(obj.data.headers),
      type: obj.data.type,
      method: obj.data.method,
      url: obj.data.url, //(obj.data.url).toString().replace(`${this.baseUrl}`,""),
      res: obj.res
    })

    if(obj.expired){
      this.commonApiResPopup = []
      this.commonApiResPopup.push(arrayv)
    }
    else{
      this.commonApiResPopup.push(arrayv)
    }
    // this.toastrService.error('everything is broken', 'Major Error', {timeOut: 3000,});
  }

  errorMesHandling(res: any, mes: any) {
    var message = mes;
    if (res) {
      if (res.response) {
        if (res.response.errorMessage) { message = res.response.errorMessage }
        if (res.response.message) { message = res.response.message }
      }
      if (res.errorMessage) { message = res.errorMessage }
      if (res.message) { message = res.message }
    }
    return message
  }





  groupBy(xs: any, key: any) {
    return xs.reduce(function (rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  sortObjByName(arr: any, key: any) {
    return arr.sort(function (a:any, b:any) { return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0); });
  }


  sortDesObjByName(arr: any, key: any) { // Sort the keys in descending order
    return arr.sort(function (a:any, b:any) { return b[key] - a[key]; });
  }



  setHeaderTitle(title:any){
    this.setBreadcrumb({
      title:title,
      path:[
        {name:this.gv.portal.TAD.TA.therapeutic_name,path:'#'},
        {name:this.gv.portal.TAD.D.disease_name,path:'#'}
      ]
    })
  }

  setBreadcrumb(obj:any){
    this.portal['breadcrumb'] = obj
  }

  // encryptData(data) {

  //     try {
  //       return CryptoJS.AES.encrypt(JSON.stringify(data), '').toString();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   decryptData(data) {

  //     try {
  //       const bytes = CryptoJS.AES.decrypt(data, '');
  //       if (bytes.toString()) {
  //         return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //       }
  //       return data;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  encryptData(data) {
      try {
        return bcrypt.hashSync(data, bcrypt.genSaltSync(10));
      } catch (e) {
        console.log(e);
      }
    }





}


