import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AppMaterialModules } from './../../material.module';
import { HeaderComponent } from './../../components/header/header.component';
import { LeftNavComponent } from './../../components/left-nav/left-nav.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,LeftNavComponent
  ],
  imports: [
    CommonModule,NgxSelectModule,
    LayoutRoutingModule,
    AppMaterialModules
  ]
})
export class LayoutModule { }
