import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html'
})

export class ChatsListComponent implements OnInit {
  _chats: any;
  @Input() set chats(value: any) {
    if(value){
      for (var i = 0; i < value.length; i++) {
        value[i].time = moment(new Date(value[i].date)).format('DD.MM.YYYY');
      };
      this.count(value);
    }
    console.log(value)
    this._chats = value;
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

  constructor() { 
  }

  ngOnInit() {
    this.selected = "";
    this.isDataError = false;
    this.counted = 0;
    if(this._chats === undefined){
      this.isDataError = true;
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
