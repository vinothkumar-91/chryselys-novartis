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
  title = 'Novartis-gpt';
  apicall:boolean=false;
  currentRoute: any;
  passwordForm:any={current_password:'',new_password:'',new_confirm:''}

  constructor(private router: Router, private authService: AuthService, private gv: GlobalVariablesService, private renderer: Renderer2, private apiService: ApiServiceService) {

    this.router.events.subscribe((event: Event) => {
      var prevPage;
      if (event instanceof NavigationStart) {
        prevPage = event.url.split("/")[2];
        this.gv.currentpage = prevPage
      }

      if (event instanceof NavigationEnd) {
        this.renderer.setAttribute(document.body, 'data-page', event.url.split("/")[2]);
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
      this.router.navigate(['/Novartis/Home']);
    }else{
      this.router.navigate(['/Novartis/Home']);
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