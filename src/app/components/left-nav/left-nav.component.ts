import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalVariablesService } from '../../global-variables.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  activeNavClass: string = '';
  menuList: any = []
  constructor(private route: Router, private gv: GlobalVariablesService,private sanitizer: DomSanitizer) { }
  userDetails: any = this.gv.userDetail;
  ngOnInit(): void {
    // console.log(this.userDetails.role)
    // this.menuList = this.gv.menuList[this.gv.userDetail.role]
    // console.log(this.menuList)


    for (let i = 0; i < this.gv.menuList[this.gv.userDetail.role].length; i++) {
      this.gv.menuList[this.gv.userDetail.role][i]['src'] = this.sanitizer.bypassSecurityTrustHtml(this.gv.menuList[this.gv.userDetail.role][i]['src']);
      this.menuList.push(this.gv.menuList[this.gv.userDetail.role][i])
      // console.log(this.menuList)
    }
    // console.log(this.menuList)

  }
  clickedNav(currentValue: any) {
    this.route.navigate(['/Novartis/' + currentValue]);
  }


  get _gv() {
    return this.gv.gv;
  }

}
