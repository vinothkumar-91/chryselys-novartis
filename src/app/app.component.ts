import { Renderer2, Component, HostListener } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, DefaultUrlSerializer } from '@angular/router';
import { environment } from './../environments/environment';

import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { GlobalVariablesService } from './global-variables.service';
import { ApiServiceService } from './api-service.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  local: number = window.location.href.indexOf('localhost');
  title = 'chryselys-PIT';
  apicall:boolean=false;
  currentRoute: any;
  passwordForm:any={current_password:'',new_password:'',new_confirm:''}

  therapeuticValue: any;
  constructor(private router: Router, private authService: AuthService, private gv: GlobalVariablesService, private renderer: Renderer2, private apiService: ApiServiceService) {

    this.router.events.subscribe((event: Event) => {
      var prevPage;
      if (event instanceof NavigationStart) {
        prevPage = event.url.split("/")[2];
        // console.log(prevPage)
        this.gv.currentpage = prevPage
      }

      if (event instanceof NavigationEnd) {
        this.renderer.setAttribute(document.body, 'data-page', event.url.split("/")[2]);
        // console.log(event.url.split("/")[1])
        // this.gv.currentpage = event.url.split("/")[1]
      }

      // if (event instanceof NavigationError) {
      //     console.log(event.error);
      // }
    });
  }

  get _gv() {
    return this.gv
  }

  apiCall:boolean =false;
  changepassword(){

  this.apiCall= true
  this.apiService.postMethod(`${this.gv.userBaseUrl}change_password`,this.passwordForm,(r: any) => {
    if(r.status_code == 200){
      this.gv.portal['popuptype'] = ''
      this.gv.setApiResPopup({ data: {}, res: { message: r.message, status: "Change Password",status_code: 200 }})
    }
      this.apiCall= false;
    }, (error: any) => { this.apiCall= false; })

  }

  ngOnInit(): void {
    try {
      this.chekUserLogin()
    } catch (e) { console.log(e) }
  }

  chekUserLogin() {
    this.gv.GloaderSet(true,"User Validation");
    var log:any = localStorage.getItem('log')
    if(log!=null && log!="null" && log!=undefined && log!="undefined" && log!="" ){
      var ud = JSON.parse(JSON.stringify(this.gv.userDetail))
      // ud.access[0].disease_name = [ud.access[0].disease_name[0]]

      if(ud.access.length == 1 && ud.access[0].disease_name.length == 1){
        // this.gv.portal['TAD'] = {TA: ud.access,D:{disease_name:ud.access[0]}}
        // console.log({"TA":{"therapeutic_name":"Oncology","therapeutic_id":3,"disease_data":[{"disease_id":1,"disease_name":"Breast Cancer","isLock":true,"link":"/PIT/Landscape"},{"disease_id":2,"disease_name":"Lung Cancer","isLock":false,"link":"/PIT/Landscape"},{"disease_id":3,"disease_name":"Blood Cancer","isLock":true,"link":"/PIT/Landscape"}],"img":"./assets/image/icons/home/Oncology.svg","isLock":false},"D":{"disease_id":2,"disease_name":"Lung Cancer","isLock":false,"link":"/PIT/Landscape"}})
        // console.log({TA: ud.access[0],D:{disease_name:ud.access[0].disease_name[0]}})
        this.gv.portal['TAD'] = {TA: ud.access[0],D:{disease_name:ud.access[0].disease_name[0]}}

        this.router.navigate(['/PIT/Settings/0']);
        // this.router.navigate(['/PIT/Referraltargets/1639444052']);
        // this.router.navigate(['/PIT/PITargets']);
        // this.router.navigate(['/PIT/PITargetDetails/1770576258']);
        // this.router.navigate(['/PIT/REDPLANUPDetails/1770576258']);
      }else{
        this.gv.portal['TAD'] = {TA: ud.access[0],D:{disease_name:ud.access[0].disease_name[0]}}
        // this.router.navigate(['/PIT/Home']);
        // this.router.navigate(['/PIT/Referraltargets/1639444052']);
        this.router.navigate(['/PIT/Settings/0']);
      }

      // this.router.navigate(['/PIT/Home']);

      // this.gv.userDetail = { id_token: log.token }
      // this.authService.triggerLogin({ id_token: log})
    }else{
      this.router.navigate(['/login']);
    }
    this.gv.GloaderSet(false,"");
  }

  get Gloader() {
    return this.gv.GloaderGet;
  }

  get apiResPopup() {
    return this.gv.getApiResPopup()
  }

  // apiResPopup:any=this.gv.getApiResPopup();

  close(i: any) {
    var array = this.gv.getApiResPopup()
    array.splice(i, 1);
    this.gv.updateApiResPopup(array)
  }

  forceReload() {
    localStorage.removeItem('log')
    localStorage.removeItem('auth')
    localStorage.removeItem('state')
    window.location.reload()
  }





  networkDisconnected: boolean = false;

  //Offline Event
  @HostListener('window:offline', ['$event'])
  OfflineEvent(event: Event) {
    this.networkDisconnected = true;
  }

  //Online event
  @HostListener('window:online', ['$event'])
  OnlineEvent(event: Event) {
    this.networkDisconnected = false;

  }


}