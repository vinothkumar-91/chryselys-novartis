import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe,CommonModule } from '@angular/common'
import {ShortNumberPipe} from './pipes/short-number.pipe'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

// import { provideOAuthClient } from 'angular-oauth2-oidc';
// import { OAuthModule } from 'angular-oauth2-oidc';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { CommonalertComponent } from './components/commonalert/commonalert.component';
import { ApiInterceptor } from "./apiInterceptor";
// import { httpInterceptorProviders } from './http-interceptors/index';
import { WindowRef } from './WindowRef';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSelectModule } from 'ngx-select-ex';
import { SortablejsModule } from 'ngx-sortablejs';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppMaterialModules } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TreeviewModule } from 'ngx-treeview';

import { BarchartComponent } from './charts/barchart/barchart.component';
import { BarverticalComponent } from './charts/barvertical/barvertical.component';
import { HomeComponent } from './page/home/home.component';
import { LandscapeComponent } from './page/landscape/landscape.component';
import { PITargetsComponent } from './page/pitargets/pitargets.component';
import { REDPLANUPComponent } from './page/redplanup/redplanup.component';
import { SettingsComponent } from './page/settings/settings.component';
import { PotentialSiteComponent } from './page/potential-site/potential-site.component';
import { EchartsxModule } from "echarts-for-angular";
import { DetailComponent } from './page/trailAnalysis/detail/detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonloaderComponent } from './components/commonloader/commonloader.component';
import { TableComponent } from './page/trailAnalysis/table/table.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { StackedBarChartComponent } from './charts/stacked-bar-chart/stacked-bar-chart.component';
import { InvestigatorComponent } from './page/trailAnalysis/detail/investigator/investigator.component';
import { PagenotfoundComponent } from './page/pagenotfound/pagenotfound.component';
// import {GoogleMapsModule} from '@angular/google-maps';
// import { AgmCoreModule } from '@agm/core';

// import {
//   IPublicClientApplication,
//   PublicClientApplication,
//   InteractionType,
//   BrowserCacheLocation,
//   LogLevel
// } from '@azure/msal-browser';
// import {
//   MsalGuard,
//   MsalInterceptor,
//   MsalBroadcastService,
//   MsalInterceptorConfiguration,
//   MsalModule,
//   MsalService,
//   MSAL_GUARD_CONFIG,
//   MSAL_INSTANCE,
//   MSAL_INTERCEPTOR_CONFIG,
//   MsalGuardConfiguration,
//   MsalRedirectComponent
// } from '@azure/msal-angular';
import { FailedComponent } from './failed/failed.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './page/settings/users/users.component';
import { ClientsComponent } from './page/settings/clients/clients.component';
import { TADiseaseComponent } from './page/settings/tadisease/tadisease.component';
import { REDPLANUPDetails } from './page/redplanup/details/details.component';
import { SimpleComponent } from './charts/simple/simple.component';
import { PidetailsComponent } from './page/pitargets/pidetails/pidetails.component';
import { ReferraltargetsComponent } from './page/pitargets/referraltargets/referraltargets.component';
import { ElistComponent } from './page/enrollment/elist/elist.component';
import { EdetailComponent } from './page/enrollment/edetail/edetail.component';

// const isIE =
//   window.navigator.userAgent.indexOf('MSIE ') > -1 ||
//   window.navigator.userAgent.indexOf('Trident/') > -1; // Remove this line to use Angular Universal

// export function loggerCallback(logLevel: LogLevel, message: string) {
//   console.log(message);
// }

// export function MSALInstanceFactory(): IPublicClientApplication {
//   console.log('We are getting MSALInstanceFactory instance');
//   return new PublicClientApplication({

//     auth: {
//       clientId: '78b93442-fc1b-4e25-a4ee-c8387df6eb8a',
//       authority: 'https://login.microsoftonline.com/c524a319-0e84-442f-a458-0d09d0622a65',
//       // validateAuthority: true,
//       redirectUri: 'http://localhost:4200/#/login-redirect',
//       postLogoutRedirectUri: 'https://localhost:4200/#/logout-redirect',
//       navigateToLoginRequestUrl: true,
//     },
//     cache: {
//       cacheLocation: 'localStorage',
//       storeAuthStateInCookie: isIE,
//     },
//     system: {
//       loggerOptions: {
//         loggerCallback,
//         logLevel: LogLevel.Info,
//         piiLoggingEnabled: false
//       }
//     }


//     // auth: {
//     //   //      clientId: 'f4299fca-0b4d-40a9-915b-deca45bc3515', // B2B AD
//     //   clientId: '60196527-e255-4df0-abba-b50e1f26c234', // B2C AD
//     //   authority: 'https://login.microsoftonline.com/common',
//     //   redirectUri: 'http://localhost:4200/#/login-redirect',
//     //   postLogoutRedirectUri: 'https://localhost:4200/#/logout-redirect'
//     // },
//     // cache: {
//     //   cacheLocation: BrowserCacheLocation.LocalStorage,
//     //   storeAuthStateInCookie: isIE // set to true for IE 11. Remove this line to use Angular Universal
//     // },
//     // system: {
//     //   loggerOptions: {
//     //     loggerCallback,
//     //     logLevel: LogLevel.Info,
//     //     piiLoggingEnabled: false
//     //   }
//     // }
//   });
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   console.log('We are getting MSALInterceptorConfigFactory instance');
//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
//     'user.read'
//   ]);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap
//   };
// }

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   console.log('We are getting MSALGuardConfigFactory instance');
//   return {
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: ['user.read']
//     },
//     loginFailedRoute: '/login-failed'
//   };
// }

@NgModule({
  declarations: [
    ShortNumberPipe,
    AppComponent,SimpleComponent,
    // LeftNavComponent,
    CommonalertComponent,
    BarchartComponent,
    BarverticalComponent,
    HomeComponent,
    LandscapeComponent,
    PITargetsComponent,
    REDPLANUPComponent,
    SettingsComponent,
    PotentialSiteComponent,
    DetailComponent,
    LoaderComponent,
    CommonloaderComponent,
    TableComponent,
    LineChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    StackedBarChartComponent,
    InvestigatorComponent,
    PagenotfoundComponent,
    FailedComponent,
    ProfileComponent,
    UsersComponent,
    ClientsComponent,
    TADiseaseComponent,
    REDPLANUPDetails,
    PidetailsComponent,
    ReferraltargetsComponent,
    ElistComponent,
    EdetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    NgxIntlTelInputModule,
    ChartsModule,
    AppMaterialModules,
    BrowserAnimationsModule,
    CommonModule,EchartsxModule,
    NoopAnimationsModule, SortablejsModule.forRoot({ animation: 150 }),
    // TreeviewModule.forRoot(),
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0"
    // }),
    // GoogleMapsModule,
    NgMultiSelectDropDownModule.forRoot(),
    // OAuthModule.forRoot(),
    // MsalModule.forRoot({
    //   auth: {
    //     clientId: '78b93442-fc1b-4e25-a4ee-c8387df6eb8a',
    //     authority: 'https://login.microsoftonline.com/c524a319-0e84-442f-a458-0d09d0622a65',
    //     validateAuthority: true,
    //     redirectUri: 'http://localhost:4200/#/login-redirect',
    //     postLogoutRedirectUri: 'https://localhost:4200/#/logout-redirect',
    //     navigateToLoginRequestUrl: true,
    //   },
    //   cache: {
    //     cacheLocation: 'localStorage',
    //     storeAuthStateInCookie: isIE,
    //   },
    // },
    // {
    //   popUp: !isIE,
    //   consentScopes: ['user.read'],
    //   unprotectedResources: ['https://www.microsoft.com/en-us/'],
    // })
  ],
  providers: [DatePipe,
    // ApiInterceptor,

    {
      provide : HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi   : true,
    },
    // {
    //   provide: MSAL_INSTANCE,
    //   useFactory: MSALInstanceFactory
    // },
    // {
    //   provide: MSAL_GUARD_CONFIG,
    //   useFactory: MSALGuardConfigFactory
    // },
    // {
    //   provide: MSAL_INTERCEPTOR_CONFIG,
    //   useFactory: MSALInterceptorConfigFactory
    // },
    // MsalService,
    // MsalGuard,
    // MsalBroadcastService,
    // httpInterceptorProviders,
    // WindowRef,provideOAuthClient()
  ],
  bootstrap: [AppComponent,
    // MsalRedirectComponent
  ]
})
export class AppModule { }
