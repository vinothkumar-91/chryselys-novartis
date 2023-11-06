import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './../home/home.component';
import { SettingsComponent } from './../settings/settings.component';
import { PagenotfoundComponent } from './../pagenotfound/pagenotfound.component';
import { UsersComponent } from './../settings/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '',component: HomeComponent},
      {path: 'Home',component: HomeComponent},
      {path: 'Settings/:id',component: SettingsComponent},
      {path: '**',component: PagenotfoundComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
