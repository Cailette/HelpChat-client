import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html'
})
export class ChatsListComponent implements OnInit {
  @Input() chatList: any = [];
  @Output() switchRoomClick = new EventEmitter<string>();
  isDataError: boolean;

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

}
