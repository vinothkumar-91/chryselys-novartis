import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from './../api-service.service';
import { GlobalVariablesService } from './../global-variables.service';
// to decode the token of user data
// import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private route: Router,private _HttpClient: HttpClient, private gv: GlobalVariablesService,private apiService: ApiServiceService) {

  }

  userData = new BehaviorSubject(null);

  // saveUserData() {
  //   let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
  //   // this.userData.next(jwtDecode(encodedUserData));
  // }
  isLoggedIn(): boolean {
    // console.log(this.gv.userDetail)
    return this.gv.userDetail != null;
  }
  logOut() {
    localStorage.removeItem('log');
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.route.navigate(['/login']);
  }

  // baseURL = 'https://routeegypt.herokuapp.com/';

  // signUp(formData: object): Observable<any> {
  //   return this._HttpClient.post(`${this.baseURL}signup`, formData);
  // }

  // signIn(formData: object): Observable<any> {
  //   return this._HttpClient.post(`${this.baseURL}signin`, formData);
  // }

  // signOut(formData: object): Observable<any> {
  //   return this._HttpClient.post(`${this.baseURL}signOut`, formData);
  // }


  // triggerLogin(user: any){
  //   console.log(this.gv.userDetail)
  //   this.route.navigate(['/PIT/Settings/0']);
  // }


    // to keep user logged in while making refresh
    // if (localStorage.getItem('userToken') != null) {
    //   // this.saveUserData();
    // }else{
  //     this.apiService.postMethod(`${this.gv.baseUrl}login`,   {
  //       "email": "vinothkumar.b@chryselys.com",
  //       "password": "xIdlSzju9TAp"
  //     }
  //   , (r: any) => {

  //       var data = (r.response) ? JSON.parse(r.response) : [];

  //       this.gv.setUserDetail(data)

  //

  //     }, (error: any) => { })
  //   }
  // }
}
