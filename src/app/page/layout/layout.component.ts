import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from './../../global-variables.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  data: any;
  url: string = './assets/json/sidemenu.json';

  constructor(private router: Router, private http: HttpClient, private gv: GlobalVariablesService) {
    // fetch(this.url).then(res => res.json())
    // .then(json => {
    //   this.data = json;
    //   this.sidenav.mode = 'side';
    //   this.sidenav.open();
    // });
  }


  currentPage(){
    return this.gv.currentpage
  }

  ngOnInit() {
  }

  get GV() {
    return this.gv
  }


}
