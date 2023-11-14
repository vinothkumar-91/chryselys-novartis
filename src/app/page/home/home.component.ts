import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {

  data:any={
    config:'',
    org:'',
    get_chat_history:'',
    get_all_chat_details:[],
    add_chat_box:''
  }
  config:any = {multi: false}
  apiCall:any = {
    config:false,
    org:false,
    get_all_chat_details:false,
    get_chat_history:false,
    add_chat_box:false
  };


  currentChatter:any=''
  constructor(public route: Router, private gv: GlobalVariablesService,private apiService: ApiServiceService, private authService: AuthService,private toastr: ToastrService) {

    this.apiCall['org'] = true;
    this.apiService.getMethod(`${this.gv.userBaseUrl}get_organisation_details`, (r: any) => {
      this.apiCall['org'] = false;
      if (r.status_code == 200) {
        this.data['org'] = r.data
        // console.log(r)


        this.apiCall['config'] = true;
        this.apiService.getMethod(`${this.gv.userBaseUrl}get_config_details?organisation_id=`+this.data['org'].organisation_id, (r: any) => {
          this.apiCall['config'] = false;
          if (r.status_code == 200) {
            this.data['config'] = r.data

            // this.filterVal={
            //   Study:[],
            //   Speciality:[],
            //   Practice_Setting:[],
            // }

            this.filterList = {
              Study:this.data['config']['Study'],
              Speciality:this.data['config']['Speciality'],
              Practice_Setting:this.data['config']['Practice_Setting'],
            }

            // setTimeout(() => {
              this.filterVal={
                Study:[this.data['config']['Study'][0]],
                Speciality:[this.data['config']['Speciality'][0]],
                Practice_Setting:[this.data['config']['Practice_Setting'][0]],
              }
            // }, 1000);
          }
        }, (error: any) => {this.apiCall['config'] = false;})

      }
    }, (error: any) => {this.apiCall['org'] = false;})

    this.get_chat_history()

  }
  ngOnInit(): void {
  //   this.menus =[
  //     {
  //       name: 'Today',
  //       active: true,
  //       topics: [
  //         { name: 'How to write an impacting',active:true},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //       ]
  //     },
  //     {
  //       name: 'Last Week',
  //       active: true,
  //       topics: [
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //         { name: 'How to write an impacting'},
  //       ]
  //     }
  //   ];
  }
  // menus:any=  []
  filterList = {
    Study:[],
    Speciality:[],
    Practice_Setting:[],
  }

  filterVal:any={
    Study:[],
    Speciality:[],
    Practice_Setting:[],
  }
  filters:any= [
    {name:'Study',id:'Study'},
    {name:'Speciality',id:'Speciality'},
    {name:'Practice Setting',id:'Practice_Setting'},
  ]
  settings = {
    // singleSelection: true,
    // idField: 'item_id',
    // textField: 'item_text',
    enableCheckAll: false,
    // selectAllText: 'All',
    // unSelectAllText: 'UnSelect All',
    allowSearchFilter: false,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: 197,
    itemsShowLimit: 1,
    searchPlaceholderText: 'Select',
    noDataAvailablePlaceholderText: 'No Data Found',
    closeDropDownOnSelection: false,
    showSelectedItemsAtTop: false,
    defaultOpen: false,
  };
  toggle(index: number) {
    // if (!this.config.multi) {
    //   this.menus.filter((menu, i) => i !== index && menu.active).forEach(menu => menu.active = !menu.active);
    // }
    this.data['get_chat_history'][index].active = !this.data['get_chat_history'][index].active;
  }


  public logout() {
    this.authService.logOut();
  }




  get_chat_history(){
    this.apiCall['get_chat_history'] = true;
    this.apiService.getMethod(`${this.gv.userBaseUrl}get_chat_history`, (r: any) => {
      this.apiCall['get_chat_history'] = false;
      if (r.status_code == 200) {
        if(r.data.length){
          r.data[0]['active']=true;
          this.data['get_chat_history'] =
          [
                {
                  name: 'Today',
                  active: true,
                  topics: r.data
                }
          ]
          this.currentChatter = r.data[0]
          this.get_all_chat_details()
        }
      }
    }, (error: any) => {this.apiCall['get_chat_history'] = false;})

  }



  get_all_chat_details(){
    this.apiService.postMethod(`${this.gv.userBaseUrl}get_all_chat_details`,
    {"chatter_id": this.currentChatter['_id']}, (r: any) => {
      this.apiCall['get_all_chat_details'] = false;
      if (r.status_code == 200) {
        if(r.data.length){
          this.data['get_all_chat_details'] =r.data

          this.filterVal={
            Study:r.data[r.data.length-1]['Study'],
            Speciality:r.data[r.data.length-1]['Speciality'],
            Practice_Setting:r.data[r.data.length-1]['Practice_Setting'],
          }

        }
      }
    }, (error: any) => {this.apiCall['get_all_chat_details'] = false;})
  }

  updateChatStatus(obj,val){
    this.apiService.postMethod(`${this.gv.userBaseUrl}add_chat_box`,{"chat_id": obj._id,"status":val}, (r: any) => {
      this.apiCall['add_chat_box'] = false;
      if (r.status_code == 200) {obj.status = val;}
    }, (error: any) => {this.apiCall['add_chat_box'] = false;})
  }

  chatbox:any=''
  // keyDownFunction(e){
  //   if (e.keyCode === 13 && this.chatbox.trim() != '') {
  //     this.triggerChat()
  //   }
  // }
  triggerChat(){
    if(this.currentChatter==''){

      // console.log(this.data['get_chat_history'][0].topics)
      // console.log([...[{_id:132}],...this.data['get_chat_history']])
      this.resetChat();
      this.currentChatter = {_id:132,active:true}
      this.data['get_chat_history'][0]['topics'] = [...[this.currentChatter],...this.data['get_chat_history'][0]['topics']]
      this.insertChat()

      // this.apiService.postMethod(`${this.gv.userBaseUrl}add_chatter_box`,{}, (r: any) => {
      //   if (r.status_code == 200) {
      //     this.resetChat();
      //     this.currentChatter = {_id:r.chatter_id}
      //     this.data['get_chat_history'][0] = [...[this.currentChatter],...this.data['get_chat_history']]
      //     this.insertChat()
      //   }
      // }, (error: any) => {})
    }else{
      this.insertChat()
    }
  }

  insertChat(){
    this.apiService.postMethod(`${this.gv.userBaseUrl}add_chat_box`,
    {...{
      "user_id": "test1@example.com",
      "chatter_id": this.currentChatter['_id'],
      "question": this.chatbox,
    },...this.filterVal}
    , (r: any) => {
      this.apiCall['add_chat_box'] = false;
      if (r.status_code == 200) {
        this.data['get_all_chat_details'].push(r.data)
      }
    }, (error: any) => {this.apiCall['add_chat_box'] = false;})
    this.chatbox = ''
  }


  newChat(){
    this.resetChat();
  }

  resetChat(){
    this.currentChatter=''
    this.data['get_chat_history'].forEach((e1, i) => {
      // this.data['get_chat_history'][i]['active'] = false;
      e1.topics.forEach((e2, i2) => {this.data['get_chat_history'][i]['topics'][i2]['active'] = false;});
    });
  }

  loadChat(obj){
    this.data['get_all_chat_details'] = []
    this.resetChat();
    obj['active']=true;
    this.currentChatter = obj
    this.get_all_chat_details()
  }


  deleteChat(obj,topics,j){
    obj.topics.splice(j, 1);
    if(topics['active']){
      if(obj.topics.length==0){this.newChat()}
      else{obj.topics[0].active=true;this.loadChat(obj.topics[0])}
    }
  }


}
