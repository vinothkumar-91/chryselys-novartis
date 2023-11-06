import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from './../api-service.service';
import { GlobalVariablesService } from './../global-variables.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private route: Router,private _HttpClient: HttpClient, private gv: GlobalVariablesService,private apiService: ApiServiceService) {

  }

  userData = new BehaviorSubject(null);

  isLoggedIn(): boolean {
    return this.gv.userDetail != null;
  }
  logOut() {
    localStorage.removeItem('log');
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.route.navigate(['/login']);
  }

}
