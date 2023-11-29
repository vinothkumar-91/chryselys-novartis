import {
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  env: any = this.gv.env;
  source_file_view: any = '';
  chatSource: any = {};
  popuptype: any = '';
  currentObj: any = {};
  lugpavisible = false;
  data: any = {
    config: '',
    org: '',
    get_chat_history: [
      { name: 'Today', active: true, topics: [] },
      { name: 'Others', active: false, topics: [] },
    ],
    get_all_chat_details: [],
    add_chat_box: '',
  };
  config: any = { multi: false };
  apiCall: any = {
    common: false,
    exportApiCall: false,
    config: false,
    org: false,
    get_all_chat_details: false,
    get_chat_history: false,
    add_chat_box: false,
  };

  filterList = {
    study_type: [],
    speciality: [],
    csv: {},
    practice_setting: [],
    lugpa: ['yes','no'],
  };

  filterVal: any = {
    study_type: [],
    speciality: [],
    practice_setting: [],
    source_file: [],
    lugpa: 'yes',
  };
  filters: any = [
    { name: 'Study Type', id: 'study_type' },
    { name: 'Speciality', id: 'speciality' },
    { name: 'Practice Setting', id: 'practice_setting' },
  ];
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
  currentChatter: any = '';
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    public route: Router,
    private gv: GlobalVariablesService,
    private apiService: ApiServiceService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.apiCall['org'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_organisation_details`,
      (r: any) => {
        this.apiCall['org'] = false;
        if (r.status_code == 200) {
          this.data['org'] = r.data;

          this.filterList['study_type'] = [];
          this.filterVal['study_type'] = [];
          this.apiCall['config'] = true;
          this.apiService.getMethod(
            `${this.gv.baseUrl}get_config_details?organisation_id=` +
              this.data['org'].organisation_id,
            (r: any) => {
              if (r.status_code == 200) {
                this.filterList['csv_filter'] = {};
                var csv = {practice_setting:[],speciality:[],study_type:[]}
                r.data.csv_data.map((b)=>{
                  this.filterList['csv_filter'][b.study_type[0].replaceAll("_"," ")] = {
                    speciality:b.speciality.map((b)=>{ return b.replaceAll("_"," ") }),
                    practice_setting:b.practice_setting.map((b)=>{ return b.replaceAll("_"," ") })
                  };console.log(this.filterList['csv_filter'][b.study_type])
                  csv['study_type'] = [...csv['study_type'],...b.study_type]
                  csv['speciality'] = [...csv['speciality'],...b.speciality]
                  csv['practice_setting'] = [...csv['practice_setting'],...b.practice_setting]
                })
                csv['study_type'] = this.gv.removeDuplicates(csv['study_type'])
                csv['speciality'] = this.gv.removeDuplicates(csv['speciality'])
                csv['practice_setting'] = this.gv.removeDuplicates(csv['practice_setting'])

                // console.log(JSON.stringify(csv))
                // console.log(JSON.stringify([this.changeToSpace(csv)]))
                this.filterList['csv'] = this.changeToSpace(csv);
                this.selectAllFilter();
                this.apiCall['config'] = false;

                this.get_chat_history();
              }
            },
            (error: any) => {
              this.apiCall['config'] = false;
            }
          );
        }
      },
      (error: any) => {
        this.apiCall['org'] = false;
      }
    );
  }

  setDefaultValue(e) {
    setTimeout(() => {
      console.log(e);
      if (e == 'source_file_view') this['source_file_view'] = 'default';
      else this['chatSource'][e] = 'default';
    }, 0);
  }

  ngOnInit(): void {}
  toggle(index: number) {
    // if (!this.config.multi) {
    //   this.data['get_chat_history'].filter((menu, i) => i !== index && menu.active).forEach(menu => menu.active = !menu.active);
    // }
    this.data['get_chat_history'][index].active =
      !this.data['get_chat_history'][index].active;
  }

  public logout() {
    this.authService.logOut();
  }

  get_chat_history() {
    this.apiCall['get_chat_history'] = true;
    this.apiService.getMethod(
      `${this.gv.baseUrl}get_chat_history`,
      (r: any) => {
        this.apiCall['get_chat_history'] = false;
        if (r.status_code == 200) {
          r.data[r.data.today.length != 0 ? 'today' : 'others'][0]['active'] =
            true;
          this.data['get_chat_history'] = [
            {
              name: 'Today',
              active: r.data.today.length == 0 ? false : true,
              topics: r.data.today,
            },
            {
              name: 'Others',
              active: r.data.today.length == 0 ? true : false,
              topics: r.data.others,
            },
          ];
          this.currentChatter =
            r.data.today.length != 0 ? r.data.today[0] : r.data.others[0];
          this.get_all_chat_details();
        } else {
          this.newChat();
        }
      },
      (error: any) => {
        this.apiCall['get_chat_history'] = false;
      }
    );
  }

  get_all_chat_details() {
    // console.log(this.filterList);

    this.apiService.postMethod(
      `${this.gv.baseUrl}get_all_chat_details`,
      { chatter_id: this.currentChatter['_id'] },
      (r: any) => {
        this.apiCall['get_all_chat_details'] = false;
        if (r.status_code == 200) {
          if (r.data.length) {
            this.data['get_all_chat_details'] = r.data;

            var filterVal = { ...this.filterVal }

            filterVal['study_type'] =
              r.data[r.data.length - 1]['study_type'];
            filterVal['speciality'] =
              r.data[r.data.length - 1]['speciality'];
            filterVal['practice_setting'] =
              r.data[r.data.length - 1]['practice_setting'];



            this.filterVal = { ...this.changeToSpace(filterVal),...{lugpa:r.data[r.data.length - 1]['lugpa']}};


            this.chatSource[r.data[r.data.length - 1].chat_id] = 'default';
          }
        } else {
          r = {
            data: [
              {
                answer:
                  " Hello! I'm Nova, an advanced assistant, and I'll do my best to help you with your question.\n\nThe core values that drive mCRPC treaters' decision-making in prostate cancer generally and early-line mCRPC specifically include:\n\n1. Patient-centered approach: Treaters prioritize the patient's needs, preferences, and quality of life when making decisions.\n2. Evidence-based medicine: Treaters rely on the latest scientific evidence and research findings to inform their decision-making.\n3. Multidisciplinary collaboration: Treaters work closely with other healthcare professionals, such as radiation oncologists, medical oncologists, and urologists, to ensure comprehensive and coordinated care.\n4. Personalized medicine: Treaters tailor their approach to each patient's unique needs and circumstances, taking into account their individual genetic profile, medical history, and lifestyle.\n5. Continuous learning and improvement: Treaters stay up-to-date with the latest advances in prostate cancer diagnosis and treatment, and they continuously evaluate and refine their approaches to ensure the best possible outcomes for their patients.\n6. Emphasis on early detection and intervention: Treaters prioritize early detection and intervention in prostate cancer, recognizing that early treatment can lead to better outcomes and improved quality of life.\n7. Focus on minimally invasive procedures: Treaters prefer minimally invasive procedures whenever possible, as they can reduce recovery time, minimize side effects, and improve patient satisfaction.\n8. Collaboration with referring physicians: Treaters work closely with referring physicians to ensure seamless transitions in care and to ensure that patients receive the most appropriate and effective treatment.\n9. Attention to patient comfort and convenience: Treaters prioritize patient comfort and convenience, recognizing that a positive patient experience can lead to better outcomes and improved adherence to treatment plans.\n10. Commitment to ongoing research and innovation: Treaters are committed to ongoing research and innovation in prostate cancer diagnosis and treatment, recognizing that advances in technology and medical knowledge can lead to better outcomes and improved quality of life for patients.\n\nIn early-line mCRPC specifically, these core values are even more critical, as the treatment landscape is rapidly evolving, and clinicians must stay up-to-date with the latest research and guidelines to provide the best possible care.\n\nI hope this helps! Let me know if you have any further questions.",
                answer_replied_on: '2023-11-24 11:39:36',
                chat_id: '65603e206d7cd0cfe27069d6',
                source_file: [
                  'FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 6-1 12pm',
                  'FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 5-24 4pm',
                  'FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 6-19 7pm',
                  'FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 5-13 1030am',
                  'FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 7-5 8pm',
                  'FLINCE_ mCRPC 3-Phase Value Drivers and Opportunity Research Interview 2023 5-31 830am',
                ],
                source_file_count: 6,
              },
            ],
            message: 'Data retrieved successfully',
            status: 'success',
            status_code: 200,
          };
          this.chatSource[r.data[r.data.length - 1].chat_id] = 'default';
          this.data['get_all_chat_details'] = r.data;
          this.filterVal['lugpa'] =
            r.data[r.data.length - 1]['lugpa'];
          this.filterVal['study_type'] =
            r.data[r.data.length - 1]['study_type'];
          this.filterVal['speciality'] =
            r.data[r.data.length - 1]['speciality'];
          this.filterVal['practice_setting'] =
            r.data[r.data.length - 1]['practice_setting'];
        }
        this.scrollToBottom();
      },
      (error: any) => {
        this.apiCall['get_all_chat_details'] = false;
      }
    );
  }

  updateChatStatus(obj, val, type) {
    this.apiService.postMethod(
      `${this.gv.baseUrl}add_chat_box`,
      {
        chat_id: obj._id,
        // "chatter_id": obj.chatter_id,
        [type]: val,
      },
      (r: any) => {
        this.apiCall['add_chat_box'] = false;
        if (r.status_code == 200) {
          obj[type] = val;
        }
      },
      (error: any) => {
        this.apiCall['add_chat_box'] = false;
      }
    );
    this.scrollToBottom();
  }

  chatbox: any = '';
  triggerChat() {
    if (this.currentChatter == '') {
      this.apiService.postMethod(
        `${this.gv.baseUrl}add_chatter_box`,
        {},
        (r: any) => {
          if (r.status_code == 200) {
            this.resetChat();
            this.currentChatter = {
              _id: r.chatter_id,
              active: true,
              header_name: this.chatbox,
            };
            this.data['get_chat_history'][0]['topics'] = [
              ...[this.currentChatter],
              ...this.data['get_chat_history'][0]['topics'],
            ];
            this.insertChat();
          }
        },
        (error: any) => {}
      );
    } else {
      this.insertChat();
    }
  }

  insertChat() {
    this.data['get_all_chat_details'].push({
      answer: '',
      chatter_id: this.currentChatter['_id'],
      question: this.chatbox,
      question_asked_on: new Date(),
    });

    // var filterVal = { ...this.filterVal };

    var req = { ...this.changeToUnderscore(this.filterVal) };
    req['lugpa'] = [req['lugpa']];
    // filterVal['lugpa'] = filterVal['lugpa'];
    // filterVal['study_type'].map((v) => {
    //   v.replaceAll('', '_');
    // });
    // filterVal['practice_setting'].map((v) => {
    //   v.replaceAll('', '_');
    // });
    // filterVal['speciality'].map((v) => {
    //   v.replaceAll('', '_');
    // });

    this.apiCall['add_chat_box'] = true;
    this.apiService.postMethod(
      `${this.gv.baseUrl}add_chat_box`,
      {
        ...{
          chatter_id: this.currentChatter['_id'],
          question: this.chatbox,
        },
        ...req,
      },
      (r: any) => {
        this.scrollToBottom();
        this.apiCall['add_chat_box'] = false;
        if (r.status_code == 200) {
          this.apiService.getMethod(
            `${this.gv.baseUrl}get_chat_details_by_id?chat_id=` +
              r.data.chat_id,
            (r2: any) => {
              if (r2.status_code == 200) {
                this.data['get_all_chat_details'][
                  this.data['get_all_chat_details'].length - 1
                ] = r2.data[0];
                this.scrollToBottom();
                // chat-details
              }
            },
            (error: any) => {}
          );
        }
      },
      (error: any) => {
        this.apiCall['add_chat_box'] = false;
      }
    );
    this.chatbox = '';
    this.scrollToBottom();
  }

  selectAllFilter() {
    this.filterList['study_type'] = this.filterList['csv']['study_type'];
    this.filterVal['study_type'] = this.filterList['csv']['study_type'];
    // this.filterList['csv'].map((o) => {
    //   if (o['study_type']) {
    //     this.filterList['study_type'].push(o['study_type']);
    //     this.filterVal['study_type'].push(o['study_type']);
    //   }
    // });
    this.apiCall['config'] = false;
    this.updateFilterList();
  }

  newChat() {
    this.data['get_all_chat_details'] = [];
    this.selectAllFilter();
    this.resetChat();
  }

  updateFilterList() {
    var speciality = [],
      practice_setting = [];

    this.filterVal['study_type'].forEach((o) => {
        speciality = [...speciality, ...this.filterList['csv_filter'][o]['speciality']];
        practice_setting = [...practice_setting, ...this.filterList['csv_filter'][o]['practice_setting']];
    });
    this.filterList['speciality'] = this.gv.removeDuplicates(speciality);
    this.filterList['practice_setting'] =
      this.gv.removeDuplicates(practice_setting);
    this.filterVal['speciality'] = this.filterList['speciality'];
    this.filterVal['practice_setting'] = this.filterList['practice_setting'];

    this.getFiles();
    this.checklugpavisible();
  }

  getFiles() {
    var req = { ...this.changeToUnderscore(this.filterVal) };
    req['lugpa'] = [req['lugpa']];
    delete req['source_file'];
    this.apiService.postMethod(
      `${this.gv.baseUrl}get_file_list`,
      req,
      (r: any) => {
        if (r.status_code == 200) {
          this.filterVal['source_file'] = r.data.file_list;
          this.source_file_view = 'default';
        }
        this.apiCall['common'] = false;
      },
      (error: any) => {
        this.apiCall['common'] = false;
      }
    );
  }

  checklugpavisible() {
    setTimeout(() => {
      this.lugpavisible = this.filterVal['speciality'].includes('urologist');
    }, 0);
  }

  resetChat() {
    this.currentChatter = '';
    if (this.data['get_chat_history'].length != 0) {
      this.data['get_chat_history'].forEach((e1, i) => {
        // this.data['get_chat_history'][i]['active'] = false;
        e1.topics.forEach((e2, i2) => {
          this.data['get_chat_history'][i]['topics'][i2]['active'] = false;
        });
      });
    }
  }

  loadChat(obj) {
    this.data['get_all_chat_details'] = [];
    this.resetChat();
    obj['active'] = true;
    this.currentChatter = obj;
    this.get_all_chat_details();
  }

  deleteChat(obj, topics, j) {
    this.apiCall['common'] = true;
    this.apiService.deleteMethod(
      `${this.gv.baseUrl}delete_chat?chatter_id=` + topics._id,
      (r: any) => {
        if (r.status_code == 200) {
          this.toastr.success(
            (this.currentObj.topics.header_name
              ? this.currentObj.topics.header_name
              : this.currentObj.topics._id) + ' chat deleted successfully',
            'Delete chat'
          );
          this.popuptype = '';
          obj.topics.splice(j, 1);
          if (topics['active']) {
            if (obj.topics.length == 0) {
              this.newChat();
            } else {
              obj.topics[0].active = true;
              this.loadChat(obj.topics[0]);
            }
          }
          this.apiCall['common'] = false;
        }
      },
      (error: any) => {
        this.apiCall['common'] = false;
      }
    );
  }

  optionChanged(e, fld) {
    if (fld == 'study_type') {
      setTimeout(() => {
        this.updateFilterList();
      }, 100);
    } else {
      this.getFiles();
    }

    // if(e == "urologist")
    this.checklugpavisible();
  }

  exportChat() {
    this.apiCall['exportApiCall'] = true;

    this.http
      .post(
        `${this.gv.baseUrl}get_all_chat_excel`,
        { chatter_id: this.currentChatter['_id'] },
        { responseType: 'blob' as 'blob' }
      )
      .subscribe(
        (response) => {
          if (response) {
            this.gv.exportExcel(
              response,
              'chathistory_' + this.datePipe.transform(new Date(), 'medium')
            );
          }
        },
        (error) => {}
      );
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if(this.myScrollContainer)
          this.myScrollContainer.nativeElement.scrollTop = 8000;
      }, 10);
    } catch (err) {}
  }


  changeToSpace(a){
    // console.log(a)
    // return a
    return {
        study_type:a.study_type.map((b)=>{ return b.replaceAll("_"," ") }),
        speciality:a.speciality.map((b)=>{ return b.replaceAll("_"," ") }),
        practice_setting:a.practice_setting.map((b)=>{ return b.replaceAll("_"," ") }),
        source_file:(a.source_file)?a.source_file:[],
        lugpa:(a.lugpa)?a.lugpa:'yes'
    }
  }

  changeToUnderscore(a){
    // console.log(a)
    return {
        source_file:(a.source_file)?a.source_file:[],
        lugpa:(a.lugpa)?a.lugpa:'yes',
        study_type:a.study_type.map((b)=>{ return b.replaceAll(" ","_") }),
        speciality:a.speciality.map((b)=>{ return b.replaceAll(" ","_") }),
        practice_setting:a.practice_setting.map((b)=>{ return b.replaceAll(" ","_") })
    }
  }

}
