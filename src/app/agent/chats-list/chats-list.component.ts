import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html'
})

export class ChatsListComponent implements OnInit {
  _chats: any;
  @Input() set chats(value: any) {
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

  constructor() { 
  }

  ngOnInit() {
    this.isDataError = false;
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
}
