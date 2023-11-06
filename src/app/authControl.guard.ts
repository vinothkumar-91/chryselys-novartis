import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { GlobalVariablesService } from './global-variables.service';
// import { MsalService } from '@azure/msal-angular';

import { AuthService } from './services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthControl implements CanActivate {

  constructor(private route: Router, private authService: AuthService, private gv: GlobalVariablesService,
    // private ssoauthService: MsalService
    ) { }

  canActivate(): boolean {
    // console.log(this.authService.isLoggedIn() , this.gv.ispageaccess)
    if (this.authService.isLoggedIn() && this.gv.ispageaccess) {
      return true;
    }
    // this.authService.startAuthentication();
    return false;
  }

  ngOnInit(): void {
    // this.ssoauthService.loginPopup().subscribe((response) => {
    //   // Handle the response or navigate to the desired route.
    // });
  }
}