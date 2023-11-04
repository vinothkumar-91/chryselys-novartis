import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthControl } from './authControl.guard';
import { AuthService } from './services/auth.service';
import { OverviewComponent } from './page/overview/overview.component';


// import { MsalGuard } from '@azure/msal-angular';
// import { BrowserUtils } from '@azure/msal-browser';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FailedComponent } from './failed/failed.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'PIT',
    pathMatch: 'full'
  },

  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [MsalGuard]
},
{
    path: '',
    component: HomeComponent
},
{
    path: 'login-failed',
    component: FailedComponent
},
  {
    path: 'login',
    loadChildren: () => import('./page/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'login/:type',
    loadChildren: () => import('./page/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'dashboard',
    component:OverviewComponent
  },
  {
    path: 'PIT',
    loadChildren: () => import('./page/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthControl]
  },
  // {
  //   path: '**',
  //   loadChildren: () => import('./page/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthControl]
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthControl, AuthService]
})
export class AppRoutingModule { }
