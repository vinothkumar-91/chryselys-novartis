import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../../global-variables.service';

@Component({
  selector: 'app-commonalert',
  templateUrl: './commonalert.component.html',
  styleUrls: ['./commonalert.component.css']
})
export class CommonalertComponent implements OnInit {

  commonpopup = this.gv.getcommonpopup();
  constructor(private gv: GlobalVariablesService) { }

  ngOnInit(): void {
    // console.log(this.gv.getcommonpopup())
  }

  close(i: any) {
    var array = this.gv.getcommonpopup()
    array.splice(i, 1);
    this.gv.updatecommonpopup(array)
  }

}
