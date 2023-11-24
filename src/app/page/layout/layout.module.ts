import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AppMaterialModules } from './../../material.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,NgxSelectModule,
    LayoutRoutingModule,
    AppMaterialModules
  ]
})
export class LayoutModule { }
