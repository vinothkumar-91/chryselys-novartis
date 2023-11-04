import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiServiceService } from '../../api-service.service';
import { GlobalVariablesService } from '../../global-variables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  apiCall: boolean = false;
  // userDetail = this.gv.userDetail;
  // _settingDefaultRegion = this.gv.userDetail._settingDefaultRegion;
  // _defaultRegion:any=localStorage.getItem('_defaultRegion')?localStorage.getItem('_defaultRegion'):localStorage.getItem('_settingDefaultRegion');
  constructor(public sanitizer: DomSanitizer, private router: Router, public route: ActivatedRoute, private apiService: ApiServiceService, private gv: GlobalVariablesService, private authService: AuthService) { }
  popuptype:any=""
  passwordForm:any={old:'',new:''}
  ngOnInit(): void {
    this.gv.portal.headerFilterOption=(this.gv.portal.headerFilterOption)?this.gv.portal.headerFilterOption:false

    // console.log(this.gv.userDetail)

    // this.gv.portal['breadcrumb'] = {
    //   title:'Trial Analysis',
    //   path:[
    //     {name:'psychiatry',path:'#'},
    //     {name:'Major Depressive Disorder',path:'#'},
    //     {name:'Trial Analysis',path:'#'}
    //   ]
    // }
  }
  filter:any=(this.gv.portal.headerFilterOption)?this.gv.portal.headerFilterOption:false;
  onOffFilter(val){
    this.gv.portal.headerFilterOption=val
    this.filter=this.gv.portal.headerFilterOption
  }


  public logout() {
    this.authService.logOut();
  }

  get userDetail() {
    return this.gv.userDetail
  }

  user: any = null;
  userItem: any = [
  ]




  doSelectOptions(e: any) {
    if (e && e[0] && e[0].length != 0) {
      this.gv.portal['userDetails'] = e[0].data;
    }

    setTimeout(() => { this.user = null; }, 0);
  }

  public style(data: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(data);
  }

  get _gv() {
    return this.gv
  }


}
