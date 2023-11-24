import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe,CommonModule } from '@angular/common'
import {ShortNumberPipe} from './pipes/short-number.pipe'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ApiInterceptor } from "./apiInterceptor";
import { WindowRef } from './WindowRef';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSelectModule } from 'ngx-select-ex';
import { SortablejsModule } from 'ngx-sortablejs';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppMaterialModules } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SettingsComponent } from './page/settings/settings.component';
import { HomeComponent } from './page/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PagenotfoundComponent } from './page/pagenotfound/pagenotfound.component';
import { UsersComponent } from './page/settings/users/users.component';
import { LoginComponent } from './page/authentication/login/login.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ShortNumberPipe,
    AppComponent,LoginComponent,
    HomeComponent,
    SettingsComponent,
    LoaderComponent,
    PagenotfoundComponent,
    UsersComponent
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
    CommonModule,
    NoopAnimationsModule, SortablejsModule.forRoot({ animation: 150 }),
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [DatePipe,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent,
  ]
})
export class AppModule { }
