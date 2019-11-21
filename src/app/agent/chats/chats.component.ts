import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat.service';
import { AgentSocketService } from '../../services/agent-socket.service';
import * as moment from 'moment';

@Component({
  providers: [AgentSocketService],
  selector: 'app-chats',
  templateUrl: './chats.component.html'
})

export class ChatsComponent implements OnInit {
  isDataError: boolean;
  isChat: boolean;
  visitorDisconnect: boolean;

  location: any;
  chats: any = [];
  chat: any;

  private onVisitorLocationChangeSubscribtion: any;
  private onReceiveMessageSubscribtion: any;
  private onVisitorDisconnectSubscribtion: any;
  private onChatListUpdateSubscribtion: any;

  constructor(
    private chatService: ChatService, 
    private agentSocketService: AgentSocketService
  ) { }

  ngOnInit() {
    this.agentSocketService.init(localStorage.getItem('agent-help-chat-token'));

    this.onVisitorLocationChangeSubscribtion = this.agentSocketService.onVisitorLocationChange()
      .subscribe(data => { this.location = data; });

    this.onReceiveMessageSubscribtion = this.agentSocketService.onReceiveMessage()
      .subscribe(message => { this.messageReceived(message) });

    this.onVisitorDisconnectSubscribtion = this.agentSocketService.onVisitorDisconnect()
      .subscribe(chatId => { this.visitorCloseChat(chatId) });
    
    this.onChatListUpdateSubscribtion = this.agentSocketService.onChatListUpdate()
      .subscribe((chat) => { chat["newMessageCounter"] = 0;  this.chats = [...this.chats, chat]; });

    this.isChat = false;
    this.isDataError = false;
    this.visitorDisconnect = false;
    this.location = "";
    this.chat = "";
    this.chats = [];
    this.getChats();
  }

  getChats(){
    this.chatService.getChats(localStorage.getItem('agent-help-chat-token'))
    .subscribe(
      (data: any) => {
        if(!localStorage.getItem("last-agent-view-messages")){
          data.chats.map(c => {
            c.newMessageCounter = c.messages.length;
          })
        } else {
          let lastDate = new Date(localStorage.getItem("last-agent-view-messages"));
          data.chats.map(c => {
            c.newMessageCounter = [...c.messages.filter(m => { 
              return new Date(m.date).getTime() > lastDate.getTime()
            })].length;
          })
        }
        this.chats = data.chats;  
      },
      (err: HttpErrorResponse) => { this.isDataError = true; }
    );
  }

  onSwitchRoom(chatId: string){
    this.visitorDisconnect = false;
    this.chat = this.chats.find(ch => {
      return ch._id === chatId
    })
    this.chat.newMessageCounter = 0;
    this.isChat = true;

    this.agentSocketService.emitSwitchRoom(this.chat._id);
    this.agentSocketService.emitGetLocation();
  }

  onSendMessage(message){
    this.agentSocketService.emitSendMessage(message);
  }

  onCloseThisChat(){
    this.chats = this.chats.filter(ch => {
      return ch._id !== this.chat._id;
    });
    this.isChat = false;
    this.chat = "";
    this.agentSocketService.emitCloseChat();
  }

  messageReceived(message) { 
    message["time"] = moment(new Date(message["date"])).format('HH:mm');
    let chatReceiveMessageId = message["chat"];
    let oldChats = this.chats;

    oldChats.map(ch => {
      if(ch._id === chatReceiveMessageId) {
        if(!(ch.messages.find(m => m._id === message["_id"]))) {
          ch.messages.unshift(message);
          if(ch._id !== this.chat._id) 
          ch.newMessageCounter = ch.newMessageCounter + 1;
        }
      }
    })

    this.chats = oldChats;
  }

  visitorCloseChat(chatId){
    this.chats = this.chats.filter(ch => {
        return ch._id !== chatId;
    });

    if(chatId === this.chat._id) {
      this.agentSocketService.emitSwitchRoom(this.chat.agent._id);
      this.visitorDisconnect = true;
      this.isChat = false;
    }
  }
  
  ngOnDestroy() {
    localStorage.setItem("last-agent-view-messages", (new Date()).toString());
    if(this.chat) this.agentSocketService.emitSwitchRoom(this.chat.agent._id);
    this.onVisitorLocationChangeSubscribtion.unsubscribe();
    this.onReceiveMessageSubscribtion.unsubscribe();
    this.onVisitorDisconnectSubscribtion.unsubscribe();
    this.onChatListUpdateSubscribtion.unsubscribe();
  }
} 
