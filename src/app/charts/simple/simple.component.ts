import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent {
  @Input() val!:any;
  @Input() color!:any;
  @Input() width!:any;
  @Input() height!:any;
  @Input() color2!:any;



  ngOnInit(): void {
    // console.log(this.val)
  }
}
