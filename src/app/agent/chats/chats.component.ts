import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat.service';
import { AgentSocketService } from '../../services/agent-socket.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html'
})
export class ChatsComponent implements OnInit {
  chatList: any = [];
  chatId: string;
  visitorId: string;
  chat: any;
  isDataError: boolean;

  constructor(private chatService: ChatService, private agentSocketService: AgentSocketService) { 
    this.agentSocketService.onLocationChange().subscribe(data => {
      console.log("...agent locationChange");
      console.log("location " + JSON.stringify(data.location));
    }); 
  }

  ngOnInit() {
    this.isDataError = false;
    this.chatId = "";
    this.visitorId = "";
    this.chat = "";
    this.chatService.getChats(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      console.log(data.chats)
      this.chatList = data.chats;  
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  onSwitchRoom(chatId: string){
    console.log("CHAT " + chatId)
    this.chatId = chatId;
    this.chat = this.chatList.find(chat => {
      return chat._id === chatId
    })
    this.agentSocketService.emitSwitchRoom(this.chat.visitor);
    this.agentSocketService.emitGetLocation();
    this.visitorId = this.chat.visitor;
  }
  
  ngOnDestroy() {
    if(this.chat){
      this.agentSocketService.emitSwitchRoom(this.chat.agent);
    }
  }
} 
