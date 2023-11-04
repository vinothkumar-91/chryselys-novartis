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
    // { name: 'VinothKumar', account: 'Roche', role: 'Doctor', id: 1, path: 'http://xsgames.co/randomusers/assets/avatars/male/1.jpg', hex: '#C0E6FF' },
    // { name: 'Pratheepa', account: 'ABC', role: 'Doctor', id: 2, path: 'http://xsgames.co/randomusers/assets/avatars/female/1.jpg', hex: '#C8F08F' },
    // { name: 'Velmurugan', account: 'Test', role: 'Doctor', id: 3, path: 'http://xsgames.co/randomusers/assets/avatars/male/2.jpg', hex: '#FFD2DD' },
    // { name: 'Sudharsan', account: 'Chryselys', role: 'Doctor', id: 4, path: 'http://xsgames.co/randomusers/assets/avatars/male/3.jpg', hex: '#FDE876' },
    // { name: 'Sanjeev', account: 'Chryselys', role: 'Doctor', id: 5, path: 'http://xsgames.co/randomusers/assets/avatars/male/4.jpg', hex: '#FDE876' }
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
