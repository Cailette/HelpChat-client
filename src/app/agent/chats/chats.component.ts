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
  // messages: any;
  // visitor: any;
  location: any = "";
  isChat: boolean;

  constructor(private chatService: ChatService, private agentSocketService: AgentSocketService) { 
    this.agentSocketService.init(localStorage.getItem('agent-help-chat-token'));
    this.agentSocketService.onVisitorLocationChange().subscribe(data => {
      console.log("...visitorLocation " + data)
      this.location = data;
    });

    this.agentSocketService.onReceiveMessage().subscribe(data => {
      console.log("...onReceiveMessage ")
      console.log(data)
      let message = data["message"];
      let chatId = data["chatId"];

      message["time"] = moment(new Date(message["date"])).format('HH:mm');

      let oldChats = this.chats;
      oldChats.map(ch => {
        if(ch._id === chatId) {
          console.log("...ch.messages.unshift(message); ")
          ch.messages.unshift(message);
          if(ch._id !== this.chat._id) {
            console.log("...ch.newMessageCounter = ch.newMessageCounter + 1 ")
            console.log(ch.newMessageCounter)
            ch.newMessageCounter = ch.newMessageCounter + 1;
            console.log(ch.newMessageCounter)
          }
        }
      })
      this.chats = oldChats;
    });

    this.agentSocketService.onVisitorDisconnect().subscribe(chatId => {
      this.chats = this.chats.filter(function( ch ) {
          return ch._id !== chatId;
      });
    });
    
    this.agentSocketService.onChatListUpdate().subscribe((chat) => {
      chat["newMessageCounter"] = 0;
      let oldChats = this.chats;
      oldChats.unshift(chat);
      this.chats = oldChats;
    });
  }

  ngOnInit() {
    this.chats = [];
    this.isChat = false;
    this.isDataError = false;
    this.chat = "";
    // this.messages = [];
    // this.visitor = "";
    this.getChats();
  }

  getChats(){
    this.chatService.getChats(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      data.chats.map(c => {
        c.newMessageCounter = 0;
      })
      this.chats = data.chats;  
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  onSwitchRoom(chatId: string){
    console.log("CHAT " + chatId)
    this.chat = this.chats.find(ch => {
      return ch._id === chatId
    })
    this.chat.newMessageCounter = 0;
    this.isChat = true;
    this.agentSocketService.emitSwitchRoom(this.chat._id);
    this.agentSocketService.emitGetLocation();
    // this.chatService.getChat(chatId, localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
    //   this.chat = data.chat;  
    //   this.visitor = this.chat.visitor;
    //   // this.messages = this.chat.messages;
    //   console.log("getLocation...");
    // },
    // (err: HttpErrorResponse) => {
    //   this.isDataError = true;
    // });
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
