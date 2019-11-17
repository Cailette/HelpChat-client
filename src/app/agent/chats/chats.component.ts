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
  chats: any = [];
  isDataError: boolean;
  chat: any;
  // messages: any;
  // visitor: any;
  location: any = "";
  isChat: boolean;
  visitorDisconnect: boolean;

  private onVisitorLocationChangeSubscribtion: any;
  private onReceiveMessageSubscribtion: any;
  private onVisitorDisconnectSubscribtion: any;
  private onChatListUpdateSubscribtion: any;

  constructor(private chatService: ChatService, private agentSocketService: AgentSocketService) { }

  ngOnInit() {
    this.agentSocketService.init(localStorage.getItem('agent-help-chat-token'));
    console.log("...subscribe ")
    this.onVisitorLocationChangeSubscribtion = this.agentSocketService.onVisitorLocationChange().subscribe(data => {
      console.log("...visitorLocation " + data)
      this.location = data;
    });

    this.onReceiveMessageSubscribtion = this.agentSocketService.onReceiveMessage().subscribe(message => {
      console.log("onReceiveMessage ")
      message["time"] = moment(new Date(message["date"])).format('HH:mm');
      let chatReceiveMessageId = message["chat"];
      let oldChats = this.chats;
      oldChats.map(ch => {
        if(ch._id === chatReceiveMessageId) {
          ch.messages.unshift(message);
          if(ch._id !== this.chat._id) {
            ch.newMessageCounter = ch.newMessageCounter + 1;
          }
        }
      })
      this.chats = oldChats;
    });

    this.onVisitorDisconnectSubscribtion = this.agentSocketService.onVisitorDisconnect().subscribe(chatId => {
      this.chats = this.chats.filter(ch => {
          return ch._id !== chatId;
      });
      if(chatId === this.chat._id) {
        this.agentSocketService.emitSwitchRoom(this.chat.agent._id);
        this.isChat = false;
        this.visitorDisconnect = true;
      }
    });
    
    this.onChatListUpdateSubscribtion = this.agentSocketService.onChatListUpdate().subscribe((chat) => {
      console.log("onChatListUpdate ")
      chat["newMessageCounter"] = 0;
      this.chats = [...this.chats, chat];
    });

    this.visitorDisconnect = false;
    this.chats = [];
    this.isChat = false;
    this.isDataError = false;
    this.chat = "";
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
    this.visitorDisconnect = false;
    console.log("CHAT " + chatId)
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
  
  ngOnDestroy() {
    if(this.chat){
      this.agentSocketService.emitSwitchRoom(this.chat.agent._id);
    }
    console.log("...unsubscribe ")
    this.onVisitorLocationChangeSubscribtion.unsubscribe();
    this.onReceiveMessageSubscribtion.unsubscribe();
    this.onVisitorDisconnectSubscribtion.unsubscribe();
    this.onChatListUpdateSubscribtion.unsubscribe();
  }
} 
