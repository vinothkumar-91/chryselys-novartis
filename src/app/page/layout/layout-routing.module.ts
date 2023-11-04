import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from '../overview/overview.component';
import { LandscapeComponent } from './../landscape/landscape.component';
import { HomeComponent } from './../home/home.component';
import { PITargetsComponent } from './../pitargets/pitargets.component';
import { REDPLANUPComponent } from './../redplanup/redplanup.component';
import { SettingsComponent } from './../settings/settings.component';
import { PotentialSiteComponent } from './../potential-site/potential-site.component';
import { DetailComponent } from './../trailAnalysis/detail/detail.component';
import { TableComponent } from './../trailAnalysis/table/table.component';
import { PagenotfoundComponent } from './../pagenotfound/pagenotfound.component';
import { REDPLANUPDetails } from './../redplanup/details/details.component';
import { PidetailsComponent } from './../pitargets/pidetails/pidetails.component';
import { ReferraltargetsComponent } from './../pitargets/referraltargets/referraltargets.component';
import { ElistComponent } from './../enrollment/elist/elist.component';
import { EdetailComponent } from './../enrollment/edetail/edetail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '',component: LandscapeComponent},
      {path: 'Home',component: HomeComponent},
      {path: 'Landscape',component: LandscapeComponent},
      {path: 'TrialAnalysis',component: TableComponent},
      {path: 'TrialAnalysisdetail/:id/:back',component: DetailComponent},
      {path: 'PITargets',component: PITargetsComponent},
      {path: 'PITargetDetails/:id',component: PidetailsComponent},
      {path: 'Referraltargets/:id',component: ReferraltargetsComponent},
      {path: 'PotentialSite',component: PotentialSiteComponent},
      {path: 'REDPLANUP',component: REDPLANUPComponent},
      {path: 'REDPLANUPDetails/:id',component: REDPLANUPDetails},
      {path: 'Enrollment',component: ElistComponent},
      {path: 'EnrollmentDetails/:id',component: EdetailComponent},
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
