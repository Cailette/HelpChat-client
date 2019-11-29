import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html'
})
export class ArchiveComponent implements OnInit {
  isDataError: boolean;
  chats: any = [];
  chat: any;
  messages: any;
  visitor: any;
  agent: any;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.resetViewData();
  }

  resetViewData(){
    this.isDataError = false;
    this.chat = "";
    this.messages = "";
    this.visitor = "";
    this.chatService.getArchiveChats(localStorage.getItem('agent-help-chat-token'))
    .subscribe(
      (data: any) => { this.chats = data.chats },
      (err: HttpErrorResponse) => { this.isDataError = true });
  }

  onSwitchRoom(chatId: string){
    this.chat = this.chats.find(chat => {
      return chat._id === chatId
    })
    this.messages = this.chat.messages;
    this.visitor = this.chat.visitor;
    this.agent = this.chat.agent;
  }

  onDeleteChat($event){
    this.resetViewData();
  }
}
