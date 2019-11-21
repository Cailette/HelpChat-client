import { Component, OnInit, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { VisitorSocketService } from 'src/app/services/visitor-socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  providers: [VisitorSocketService],
  selector: 'app-chatting-window',
  templateUrl: './chatting-window.component.html'
})
export class ChattingWindowComponent implements OnInit, OnDestroy, AfterViewInit {
  chat: any;
  message: string;
  messages: any;
  agentId: any;
  agentDisconnect: boolean;

  private onConnectionWithAgentSubscribtion: any;
  private onErrorSubscribtion: any;
  private onGetLocationSubscribtion: any;
  private onNextChatSubscribtion: any;
  private onReceiveMessage: any;
  private onAgentDisconnect: any;

  constructor(
    private router: Router, 
    private activatedRouter: ActivatedRoute, 
    private visitorSocketService: VisitorSocketService
  ) { }

  ngOnInit() {
    this.visitorSocketService.init(localStorage.getItem('visitor-help-chat-token'));

    this.onConnectionWithAgentSubscribtion = 
      this.visitorSocketService.onConnectionWithAgent()
        .subscribe(chat => { this.chat = chat; });

    this.onErrorSubscribtion = 
      this.visitorSocketService.onError()
        .subscribe(error => { console.log(JSON.stringify(error)) });
      
    this.onGetLocationSubscribtion =
      this.visitorSocketService.onGetLocation()
        .subscribe(() => { window.parent.postMessage("getLocation", "*"); });
    
    this.onNextChatSubscribtion = 
      this.visitorSocketService.onNextChat()
      .subscribe(chat => { this.nextChat(chat) });

    this.onReceiveMessage = 
      this.visitorSocketService.onReceiveMessage()
        .subscribe(message => { this.newMessage(message) });

    this.onAgentDisconnect = 
      this.visitorSocketService.onAgentDisconnect()
        .subscribe(() => {  this.agentDisconnect = true; });

    this.activatedRouter.params
      .subscribe(params => { this.agentId = params['agentId']; });

    this.agentDisconnect = false;
    this.messages = [];
    this.chat = "";
  }

  ngAfterViewInit() {
    this.visitorSocketService.emitConnectWithAgent(
      this.agentId === 'nextChat' ? null : this.agentId);
  }
  
  ngOnDestroy() {
    localStorage.setItem("disconnect", "1"); 
    localStorage.removeItem("openchat");
    this.router.navigate(['/chat/rating', this.chat._id]);
    this.visitorSocketService.disconnect();
    this.onConnectionWithAgentSubscribtion.unsubscribe();
    this.onErrorSubscribtion.unsubscribe();
    this.onGetLocationSubscribtion.unsubscribe();
    this.onNextChatSubscribtion.unsubscribe();
    this.onReceiveMessage.unsubscribe();
    this.onAgentDisconnect.unsubscribe();
  }

  sendMessage(){
    if(this.message !== "") 
      this.visitorSocketService.emitSendMessage(this.message);
    this.message = "";
  }

  nextChat(chat){
    this.chat = chat;
    this.agentId = chat["agent"]["_id"]
    if(chat["messages"]){
      let chatMessages = chat["messages"]
      for (var i = 0; i < chatMessages.length; i++) {
        chatMessages[i].time = moment(new Date(chatMessages[i].date)).format('HH:mm');
      };
      this.messages = chatMessages;
    }
  }

  newMessage(message){
    message["time"] = moment(new Date(message["date"])).format('HH:mm');
    this.messages.unshift(message);
  }
  
  @HostListener('window:message', ['$event'])
    onMessage(event) {
      if (event.data.res == "locationChange") {
        let location = event.data.data.toString();
        this.visitorSocketService.emitLocationChange(location);
      }
  }
}
