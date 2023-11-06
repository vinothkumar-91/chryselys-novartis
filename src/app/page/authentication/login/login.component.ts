import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { GlobalVariablesService } from '../../../global-variables.service';
import { ApiServiceService } from '../../../api-service.service';

import { AuthService } from '../../../services/auth.service'





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  apiCall: boolean = false;
  forgetPassword:boolean = false;
  popupType:any = 'login';
  type:any= ''
  // loginform: any = { email: '', password: '',new_password:'' }
  loginform: any = { email: 'vinothkumar.b@chryselys.com', password: 'Ganesh@123',new_password:'' }
  constructor(private router: Router,route: ActivatedRoute, private authService: AuthService,  private gv: GlobalVariablesService, private apiService: ApiServiceService) {


    route.params.subscribe((params) => {
      this.type = (params["type"])?params["type"]:'default';
    });

  }

  ngOnInit(): void {

  }


  get Gloader() {
    return this.gv.GloaderGet;
  }


  onSubmit() {

    this.apiCall = true;

    if(this.popupType == 'forgetPassword')
    {
      var req = JSON.parse(JSON.stringify(this.loginform))
      delete req['password']
      delete req['new_password']
      this.apiService.postMethod(`${this.gv.userBaseUrl}forgot_password`, req, (r: any) => {
        this.apiCall = false;
        if (r.status_code == 200) {
          this.popupType = 'OTP'
          this.gv.setApiResPopup({ data: {}, res: {status_code:200, message: "OTP was sent to you registered email.", status: "OTP Sent" }})
        }
      },(error: any) => {this.apiCall = false;})
    }
    else
    if(this.popupType == 'OTP')
    {
      var req = JSON.parse(JSON.stringify(this.loginform))
      delete req['password']
      delete req['new_password']
      // delete req['email']
      this.apiService.postMethod(`${this.gv.userBaseUrl}verify_otp`, req, (r: any) => {
        this.apiCall = false;
        if (r.status_code == 200) {
          this.loginform.password =''
          this.loginform.new_password =''
          this.popupType = 'changePassword'
        }
      },(error: any) => {this.apiCall = false;})
    }
    else
    if(this.popupType == 'changePassword')
    {
      var req = JSON.parse(JSON.stringify(this.loginform))
      delete req['OTP']
      delete req['password']
      this.apiService.postMethod(`${this.gv.userBaseUrl}change_password_for_OTP`, req, (r: any) => {
        this.apiCall = false;
        if (r.status_code == 200) {
          this.popupType = 'login'
          this.gv.setApiResPopup({ data: {}, res: {status_code:200, message: r.message, status: "Change Password" }})
        }
      },(error: any) => {this.apiCall = false;})
    }
    else if(this.popupType == 'login')
    {this.apiService.postMethod(`${this.gv.userBaseUrl}login`, JSON.stringify(this.loginform), (r: any) => {
      this.apiCall = false;
      if (r.status_code == 200) {
        r.data['token'] = r.token
        var obj = {}
        r.data.access.forEach(ta => {
          obj[ta.therapeutic_name] = ta.disease_name
        });
        r.data['ta'] = obj
        this.gv.setUserDetail(r)

        var ud = JSON.parse(JSON.stringify(r.data))
        if(ud.access.length == 1 && ud.access[0].disease_name.length == 1){
          this.gv.portal['TAD'] = {TA: ud.access[0],D:{disease_name:ud.access[0].disease_name[0]}}

          this.router.navigate(['/Novartis/Home']);
        }else{
          this.router.navigate(['/Novartis/Home']);
        }
      }else{

      }
    }, (error: any) => {
      this.apiCall = false;
    })}

  }

  get _gv() {
    return this.gv
  }
}
