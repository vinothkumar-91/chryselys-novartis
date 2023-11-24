
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
  source_file_view:any=''
  chatSource:any = {}
  popuptype:any = ''
  currentObj:any = {}
  LUGPAvisible = false;
  data:any={
    config:'',
    org:'',
    get_chat_history:'',
    get_all_chat_details:[],
    add_chat_box:''
  }
  config:any = {multi: false}
  apiCall:any = {
    common:false,
    exportApiCall:false,
    config:false,
    org:false,
    get_all_chat_details:false,
    get_chat_history:false,
    add_chat_box:false
  };


  filterList = {
    study:[],
    speciality:[],
    csv:[],
    practice_setting:[],
    LUGPA:['Yes','No']
  }

  filterVal:any={
    study:[],
    speciality:[],
    practice_setting:[],
    source_file:[],
    LUGPA:'Yes'
  }
  filters:any= [
    {name:'study',id:'study'},
    {name:'speciality',id:'speciality'},
    {name:'Practice Setting',id:'practice_setting'},
  ]
  settings = {
    singleSelection: false,
    // idField: 'item_id',
    // textField: 'item_text',
    enableCheckAll: true,
    selectAllText: 'All',
    unSelectAllText: 'Unselect All',
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
  currentChatter:any=''
  constructor(private datePipe: DatePipe,public route: Router, private gv: GlobalVariablesService,private apiService: ApiServiceService, private authService: AuthService,private toastr: ToastrService) {

    this.apiCall['org'] = true;
    this.apiService.getMethod(`${this.gv.baseUrl}get_organisation_details`, (r: any) => {
      this.apiCall['org'] = false;
      if (r.status_code == 200) {
        this.data['org'] = r.data
        // console.log(r)


        this.apiCall['config'] = true;
        this.apiService.getMethod(`${this.gv.baseUrl}get_config_details?organisation_id=`+this.data['org'].organisation_id, (r: any) => {
          this.apiCall['config'] = false;
          if (r.status_code == 200) {
            this.filterList['csv'] = r.data.csv_data
            this.filterList['study'] = this.filterList['csv'].map(o => o.study_type)

                // this.filterVal['study']=this.data['config']['study']
                // this.filterVal['speciality']=this.data['config']['speciality']
                // this.filterVal['practice_setting']=this.data['config']['practice_setting']
          }
        }, (error: any) => {this.apiCall['config'] = false;})

      }
    }, (error: any) => {this.apiCall['org'] = false;})

    this.get_chat_history()

  }

  setDefaultValue(e){
    setTimeout(() => {
      console.log(e)
      if(e == 'source_file_view')
        this['source_file_view'] = 'default'
      else
        this['chatSource'][e] = 'default'

    }, 0);
  }

  ngOnInit(): void {
  }
  toggle(index: number) {
    // if (!this.config.multi) {
    //   this.data['get_chat_history'].filter((menu, i) => i !== index && menu.active).forEach(menu => menu.active = !menu.active);
    // }
    this.data['get_chat_history'][index].active = !this.data['get_chat_history'][index].active;
  }


  public logout() {
    this.authService.logOut();
  }




  get_chat_history(){
    this.apiCall['get_chat_history'] = true;
    this.apiService.getMethod(`${this.gv.baseUrl}get_chat_history`, (r: any) => {
      this.apiCall['get_chat_history'] = false;
      if (r.status_code == 200) {
          r.data[(r.data.today.length!=0)?'today':'others'][0]['active']=true
          this.data['get_chat_history'] =
          [
                {
                  name: 'Today',
                  active: (r.data.today.length==0)?false:true,
                  topics: r.data.today
                },
                {
                  name: 'Others',
                  active: (r.data.today.length==0)?true:false,
                  topics: r.data.others
                }
          ]
          this.currentChatter = (r.data.today.length!=0)?r.data.today[0]:r.data.others[0]
          this.get_all_chat_details()
      }
    }, (error: any) => {this.apiCall['get_chat_history'] = false;})

  }



  get_all_chat_details(){




    this.apiService.postMethod(`${this.gv.baseUrl}get_all_chat_details`,
    {"chatter_id": this.currentChatter['_id']}, (r: any) => {
      this.apiCall['get_all_chat_details'] = false;
      if (r.status_code == 200) {
        if(r.data.length){
          this.data['get_all_chat_details'] =r.data
          this.filterVal['study']=r.data[r.data.length-1]['Study']
          this.filterVal['speciality']=r.data[r.data.length-1]['Speciality']
          this.filterVal['practice_setting']=r.data[r.data.length-1]['Practice_Setting']
        }
      }else{
        r = {
          "data":[ {
              "answer": " Hello! I'm Nova, an advanced assistant, and I'll do my best to help you with your question.\n\nThe core values that drive mCRPC treaters' decision-making in prostate cancer generally and early-line mCRPC specifically include:\n\n1. Patient-centered approach: Treaters prioritize the patient's needs, preferences, and quality of life when making decisions.\n2. Evidence-based medicine: Treaters rely on the latest scientific evidence and research findings to inform their decision-making.\n3. Multidisciplinary collaboration: Treaters work closely with other healthcare professionals, such as radiation oncologists, medical oncologists, and urologists, to ensure comprehensive and coordinated care.\n4. Personalized medicine: Treaters tailor their approach to each patient's unique needs and circumstances, taking into account their individual genetic profile, medical history, and lifestyle.\n5. Continuous learning and improvement: Treaters stay up-to-date with the latest advances in prostate cancer diagnosis and treatment, and they continuously evaluate and refine their approaches to ensure the best possible outcomes for their patients.\n6. Emphasis on early detection and intervention: Treaters prioritize early detection and intervention in prostate cancer, recognizing that early treatment can lead to better outcomes and improved quality of life.\n7. Focus on minimally invasive procedures: Treaters prefer minimally invasive procedures whenever possible, as they can reduce recovery time, minimize side effects, and improve patient satisfaction.\n8. Collaboration with referring physicians: Treaters work closely with referring physicians to ensure seamless transitions in care and to ensure that patients receive the most appropriate and effective treatment.\n9. Attention to patient comfort and convenience: Treaters prioritize patient comfort and convenience, recognizing that a positive patient experience can lead to better outcomes and improved adherence to treatment plans.\n10. Commitment to ongoing research and innovation: Treaters are committed to ongoing research and innovation in prostate cancer diagnosis and treatment, recognizing that advances in technology and medical knowledge can lead to better outcomes and improved quality of life for patients.\n\nIn early-line mCRPC specifically, these core values are even more critical, as the treatment landscape is rapidly evolving, and clinicians must stay up-to-date with the latest research and guidelines to provide the best possible care.\n\nI hope this helps! Let me know if you have any further questions.",
              "answer_replied_on": "2023-11-24 11:39:36",
              "chat_id": "65603e206d7cd0cfe27069d6",
              "source_file": [
                  "FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 6-1 12pm",
                  "FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 5-24 4pm",
                  "FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 6-19 7pm",
                  "FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 5-13 1030am",
                  "FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 7-5 8pm",
                  "FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 5-31 830am"
              ],
              "source_file_count": 6
          }],
          "message": "Data retrieved successfully",
          "status": "success",
          "status_code": 200
      }
      this.chatSource[r.data[r.data.length-1].chat_id] = 'default'
      this.data['get_all_chat_details'] =r.data
      this.filterVal['study']=r.data[r.data.length-1]['study']
      this.filterVal['speciality']=r.data[r.data.length-1]['speciality']
      this.filterVal['practice_setting']=r.data[r.data.length-1]['practice_setting']

      }
    }, (error: any) => {this.apiCall['get_all_chat_details'] = false;})
  }

  updateChatStatus(obj,val){
    this.apiService.postMethod(`${this.gv.baseUrl}add_chat_box`,{"chat_id": obj._id,"feedback_status":val}, (r: any) => {
      this.apiCall['add_chat_box'] = false;
      if (r.status_code == 200) {obj.feedback_status = val;}
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

      // this.resetChat();
      // this.currentChatter = {_id:132,active:true}
      // this.data['get_chat_history'][0]['topics'] = [...[this.currentChatter],...this.data['get_chat_history'][0]['topics']]
      // this.insertChat()

      this.apiService.postMethod(`${this.gv.baseUrl}add_chatter_box`,{}, (r: any) => {
        if (r.status_code == 200) {
              this.resetChat();
              this.currentChatter = {_id:r.chatter_id,active:true}
              this.data['get_chat_history'][0]['topics'] = [...[this.currentChatter],...this.data['get_chat_history'][0]['topics']]
              this.insertChat()
            }
      }, (error: any) => {})
    }else{
      this.insertChat()
    }
  }

  insertChat(){
    this.apiService.postMethod(`${this.gv.baseUrl}add_chat_box`,
    {...{
      "chatter_id": this.currentChatter['_id'],
      "question": this.chatbox,
    },...this.filterVal}
    , (r: any) => {
      this.apiCall['add_chat_box'] = false;
      if (r.status_code == 200) {
        this.apiService.getMethod(`${this.gv.baseUrl}get_chat_details_by_id?chat_id=`+r.chat_id, (r2: any) => {
          if (r2.status_code == 200) {
        this.data['get_all_chat_details'].push(r2.data[0])
        // chat-details
      }
      }, (error: any) => {})
    }
    }, (error: any) => {this.apiCall['add_chat_box'] = false;})
    this.chatbox = ''
  }


  newChat(){
    this.resetChat();

    this.filterList['study'] = this.filterList['csv'].map(o => o.study_type)
    this.filterVal['study'] = this.filterList['csv'].map(o => o.study_type)
    this.updateFilterList()
    // this.filterVal['study']=this.filterList['csv'].filter(o => o.study_type=='study')[0]['speciality']
    // this.filterVal['speciality']=this.filterList['csv'].filter(o => o.study_type=='study')[0]['practice_setting']
    // this.filterVal['practice_setting']=[]


    // this.filterVal['study']=this.data['config']['study']
    // this.filterVal['speciality']=this.data['config']['speciality']
    // this.filterVal['practice_setting']=this.data['config']['practice_setting']
  }

  updateFilterList(){

    var speciality = [],practice_setting = [];
    this.filterList['csv'].forEach(o=>{
      if(this.filterVal['study'].includes(o.study_type)){
        speciality = [...speciality,...o.speciality]
        practice_setting = [...practice_setting,...o.practice_setting]
      }
    })
    this.filterList['speciality'] = this.gv.removeDuplicates(speciality)
    this.filterList['practice_setting'] = this.gv.removeDuplicates(practice_setting)
    this.filterVal['speciality'] = this.filterList['speciality']
    this.filterVal['practice_setting'] = this.filterList['practice_setting']

    this.getFiles()
    this.checkLUGPAvisible()
  }

  getFiles(){
    this.apiService.postMethod(`${this.gv.baseUrl}get_file_list`, this.filterVal,(r: any) => {
      if (r.status_code == 200) {
        this.filterVal['source_file'] = r.data.file_list;
        this.source_file_view='default'
      }
      this.apiCall['common'] = false;
      }, (error: any) => {this.apiCall['common'] = false;})
  }

  checkLUGPAvisible(){
    this.LUGPAvisible=(this.filterVal['speciality'].includes("urologist"))
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
    this.apiCall['common'] = true;
    this.apiService.deleteMethod(`${this.gv.baseUrl}delete_chat?chatter_id=`+topics._id, (r: any) => {
      if (r.status_code == 200) {
        this.popuptype = ''
        obj.topics.splice(j, 1);
        if(topics['active']){
          if(obj.topics.length==0){this.newChat()}
          else{obj.topics[0].active=true;this.loadChat(obj.topics[0])}
        }
        this.apiCall['common'] = false;
      }
    }, (error: any) => {this.apiCall['common'] = false;})


  }

  optionChanged(e,fld){
    if(fld == 'study'){
      this.updateFilterList()
      // this.filterList['speciality'] = this.filterList['csv'].filter(o => o.study_type==e)[0]['speciality']
      // this.filterList['practice_setting'] = this.filterList['csv'].filter(o => o.study_type==e)[0]['practice_setting']
    }



    if(e == "urologist")
      this.checkLUGPAvisible()
  }

exportChat(){
  this.apiCall['exportApiCall'] = true;
  this.apiService.filedownload(`${this.gv.baseUrl}get_all_chat_excel`, (r: any) => {
          this.gv.exportExcel(r, 'chathistory_' + this.datePipe.transform(new Date(), 'medium')); this.apiCall['exportApiCall'] = false;
        }, (error: any) => { this.apiCall['exportApiCall'] = false; })

}

}
