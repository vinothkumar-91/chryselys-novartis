import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from './../api-service.service';
import { GlobalVariablesService } from './../global-variables.service';
import { BehaviorSubject, Observable } from 'rxjs';


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
    this.userData.next(null);
    this.route.navigate(['/login']);
  }

}
