import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { GlobalRole } from '../../auth/Role';


@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html'
})

export class ChatsListComponent implements OnInit {
  role: string;
  id: string;
  Agent: string;

  _chats: any = [];
  @Input() set chats(value: any) {
    if(value){
      for (var i = 0; i < value.length; i++) {
        value[i].time = moment(new Date(value[i].date)).format('DD.MM.YYYY');
        console.log(value[0].time)
      };
      this.count(value);
      console.log("@Input() set chats(value: any)")
      console.log(value)
      // console.log(value[0].time)
      this._chats = value;
    }
  }

  @Input() isArchive: boolean = false;
  @Output() switchRoomClick = new EventEmitter<string>();
  isDataError: boolean;
  isFilter: boolean = false;
  isSort: boolean = false;
  agents: any = [];
  filterChatDate: string = "all";
  filterChatAgent: string = "all";
  filterChatRating: string = "all";

  selected: string;
  counted: number;

  constructor(private globalRole: GlobalRole) {
    this.role = this.globalRole.role;
    this.Agent = this.globalRole.Agent;
    this.id = this.globalRole.id;
  }

  ngOnInit() {
    this.selected = "";
    this.isDataError = false;
    this.counted = 0;
    if(this._chats === undefined){
      this.isDataError = true;
    }
    if(this.role === this.Agent){
      this.filterChatAgent = this.id;
    }
  }

  onChange(option, filter) {
    if(filter == "filterChatDate"){
      this.filterChatDate = option
    }
    if(filter == "filterChatAgent"){
      this.filterChatAgent = option
    }
    if(filter == "filterChatRating"){
      this.filterChatRating = option
    }
  }

  switchRoom(chatId: string){
    this.switchRoomClick.emit(chatId);
    this.selected = chatId;
  }

  showFilter() {
    const agentsFormChat = [... this._chats.map(data => data.agent)]
    this.agents = agentsFormChat.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj["_id"]).indexOf(obj["_id"]) === pos;
      });
    this.isFilter = !this.isFilter;
  }

  showSort() {
    this.isSort = !this.isSort;
  }

  count(value: Array<any>){
    this.counted = value.length;
  }
}
