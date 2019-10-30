import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html'
})
export class ArchiveComponent implements OnInit {
  chatList: any = [];
  isDataError: boolean;
  chat: any;
  messages: any;
  visitor: any;
  agent: any;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.isDataError = false;
    this.chat = "";
    this.messages = "";
    this.visitor = "";
    this.chatService.getArchiveChats(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.chatList = data.chats;  
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  onSwitchRoom(chatId: string){
    console.log("CHAT " + chatId)
    this.chat = this.chatList.find(chat => {
      return chat._id === chatId
    })
    this.visitor = this.chat.visitor;
    this.agent = this.chat.agent;
  }
}
