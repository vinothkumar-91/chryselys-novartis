import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { GlobalVariablesService } from '../../../global-variables.service';
import { ApiServiceService } from '../../../api-service.service';

import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiCall: boolean = false;
  forgetPassword:boolean = false;
  popupType:any = 'login';
  type:any= ''
  loginform: any = { email: 'vinothkumar.b@chryselys.com', password: 'Ganesh@123',new_password:'' }
  constructor(private router: Router,route: ActivatedRoute, private authService: AuthService,  private gv: GlobalVariablesService, private apiService: ApiServiceService) {


    route.params.subscribe((params) => {
      this.type = (params["type"])?params["type"]:'default';
    });

    // if(localStorage.getItem('state') == 'true'){
    //   this.gv.GloaderSet(true,"Connecting SSO");
    // }else{
    //   // this.gv.GloaderSet(false,"");
    // }

  }

  ngOnInit(): void {

  }


  get Gloader() {
    // console.log('loader ==> ',this.gv.GloaderGet)
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
          // this.gv.setApiResPopup({ data: {}, res: {status_code:200, message: "Requested a new password for your PIT account OTP is "+r.OTP+". If you didn’t make this request, please ignore this email", status: "PIT | OTP for Forgot Password" }})
          // this.gv.setApiResPopup({ data: {}, res: {status_code:200, message: "Requested a new password for your PIT account OTP is 123456. If you didn’t make this request, please ignore this email", status: "PIT OTP for Forgot Password" }})
          // this.gv.setApiResPopup({ data: {}, res: {status_code:200, message: "OTP was sent to you registered email.", status: "OTP Sent" }})
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
          // this.gv.setApiResPopup({ data: {}, res: {status_code:200, message: "OTP was sent to you registered email.", status: "OTP Sent" }})
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
        // ud.access[0].disease_name = [ud.access[0].disease_name[0]]
// console.log(ud.access.length,ud.access[0].disease_name.length,ud.access.length == 1 && ud.access[0].disease_name.length == 1)
        if(ud.access.length == 1 && ud.access[0].disease_name.length == 1){
          this.gv.portal['TAD'] = {TA: ud.access[0],D:{disease_name:ud.access[0].disease_name[0]}}

          // this.gv.portal['TAD'] = {TA: ud.access,D:{disease_name:ud.access[0]}}
          this.router.navigate(['/PIT/PITargets']);
        }else{
          this.router.navigate(['/PIT/Home']);
        }

        // this.router.navigateByUrl('/PIT/Settings/0');
      }else{
        // this.gv.setUserDetail({
        //   "data": {
        //     "email": "vinothkumar.b@chryselys.com",
        //     "role": "viewer",
        //     "first_name": "Vinothkumar",
        //     "last_name": "Balasubramani",
        //     "therapeutic_name": {
        //       "psychiatry": ['MDD']
        //     }
        //   },
        //   "status": "success",
        //   "status_code": 200,
        //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NTU2Nzg1MiwianRpIjoiMDkzMzI2NzUtMDNiYy00YTg0LTg0MDQtMmFhNGMzNTQ2MGRmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InZpbm90aGt1bWFyLmJAY2hyeXNlbHlzLmNvbSIsIm5iZiI6MTY5NTU2Nzg1MiwiZXhwIjoxNjk1NjU0MjUyfQ.YfMJ2y2ReWP4DHnM2_3rU81AUOYZ-79hGmIK-rJJzpc"
        // })
      }
      // this.router.navigateByUrl('/PIT/Home');
    }, (error: any) => {
      this.apiCall = false;
    //   this.gv.setUserDetail({
    //     "data": {
    //       "email": "vinothkumar.b@chryselys.com",
    //       "role": "viewer",
    //       "first_name": "Vinothkumar",
    //       "last_name": "Balasubramani",
    //       "therapeutic_name": {
    //         "psychiatry": ['MDD']
    //       }
    //     },
    //     "status": "success",
    //     "status_code": 200,
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NTU2Nzg1MiwianRpIjoiMDkzMzI2NzUtMDNiYy00YTg0LTg0MDQtMmFhNGMzNTQ2MGRmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InZpbm90aGt1bWFyLmJAY2hyeXNlbHlzLmNvbSIsIm5iZiI6MTY5NTU2Nzg1MiwiZXhwIjoxNjk1NjU0MjUyfQ.YfMJ2y2ReWP4DHnM2_3rU81AUOYZ-79hGmIK-rJJzpc"
    //   })
    //   this.router.navigateByUrl('/PIT/Home');
    })}

  }

  get _gv() {
    return this.gv
  }
}
