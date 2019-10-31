import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat.service';
import { AgentSocketService } from '../../services/agent-socket.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html'
})
export class ChatsComponent implements OnInit {
  chats: any = [];
  isDataError: boolean;
  chat: any;
  messages: any;
  visitor: any;
  location: any = "";

  constructor(private chatService: ChatService, private agentSocketService: AgentSocketService) { 
    this.agentSocketService.init(localStorage.getItem('agent-help-chat-token'));
    this.agentSocketService.onVisitorLocationChange().subscribe(data => {
      console.log("...visitorLocation " + data)
      this.location = data;
    });
  }

  ngOnInit() {
    this.isDataError = false;
    this.chat = "";
    this.messages = "";
    this.visitor = "";
    this.chatService.getChats(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.chats = data.chats;  
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  onSwitchRoom(chatId: string){
    console.log("CHAT " + chatId)
    this.chat = this.chats.find(chat => {
      return chat._id === chatId
    })
    this.visitor = this.chat.visitor;
    this.agentSocketService.emitSwitchRoom(this.chat.visitor);
    this.agentSocketService.emitGetLocation();
    console.log("getLocation...");
  }
  
  ngOnDestroy() {
    if(this.chat){
      this.agentSocketService.emitSwitchRoom(this.chat.agent);
    }
  }
} 
