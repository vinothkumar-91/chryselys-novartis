import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthControl } from './authControl.guard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './page/authentication/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'Novartis',
    pathMatch: 'full'
  },
  {
    path: 'login',component:LoginComponent
  },
  {
    path: 'Novartis',
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
