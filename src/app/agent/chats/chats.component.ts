import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat.service';
import { AgentSocketService } from '../../services/agent-socket.service';
import * as moment from 'moment';

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
  isChat: boolean;

  constructor(private chatService: ChatService, private agentSocketService: AgentSocketService) { 
    this.agentSocketService.init(localStorage.getItem('agent-help-chat-token'));
    this.agentSocketService.onVisitorLocationChange().subscribe(data => {
      console.log("...visitorLocation " + data)
      this.location = data;
    });
    this.agentSocketService.onReceiveMessage().subscribe(message => {
      message["time"] = moment(new Date(message["date"])).format('HH:mm');
      console.log("...onReceiveMessage " + message)
      this.messages.unshift(message);
    });
  }

  ngOnInit() {
    this.isChat = false;
    this.isDataError = false;
    this.chat = "";
    this.messages = [];
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
    this.chatService.getChat(chatId, localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.chat = data.chat;  
      this.visitor = this.chat.visitor;
      this.messages = this.chat.messages;
      this.agentSocketService.emitSwitchRoom(this.chat._id);
      this.agentSocketService.emitGetLocation();
      this.isChat = true;
      console.log("getLocation...");
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  onSendMessage(message){
    this.agentSocketService.emitSendMessage(message);
  }
  
  ngOnDestroy() {
    if(this.chat){
      this.agentSocketService.emitSwitchRoom(this.chat.agent._id);
    }
  }
} 
