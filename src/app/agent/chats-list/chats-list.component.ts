import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html'
})
export class ChatsListComponent implements OnInit {
  @Input() chatList: any = [];
  @Input() isArchive: boolean = false;
  @Output() switchRoomClick = new EventEmitter<string>();
  isDataError: boolean;
  isFilter: boolean = false;
  isSort: boolean = false;
  agents: any = [];

  constructor() { 
  }

  ngOnInit() {
    this.isDataError = false;
    if(this.chatList === undefined){
      this.isDataError = true;
    }
  }

  switchRoom(chatId: string){
    this.switchRoomClick.emit(chatId);
  }

  showFilter() {
    const agentsFormChat = [... this.chatList.map(data => data.agent)]
    this.agents = agentsFormChat.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj["_id"]).indexOf(obj["_id"]) === pos;
      });
    this.isFilter = !this.isFilter;
  }

  showSort() {
    this.isSort = !this.isSort;
  }
}
