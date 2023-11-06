
import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activetab:any=0;

  constructor(private gv: GlobalVariablesService) { }
  get _gv(){return this.gv}
  ngOnInit(): void {
    this.gv.setBreadcrumb({
      title:'Settings',
      path:[
        {name:'Settings'},
        {name:'User Configuration'}
      ]
    })
  }

}
