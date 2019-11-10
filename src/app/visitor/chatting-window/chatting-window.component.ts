import { Component, OnInit, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { VisitorSocketService } from 'src/app/services/visitor-socket.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-chatting-window',
  templateUrl: './chatting-window.component.html'
})
export class ChattingWindowComponent implements OnInit, OnDestroy, AfterViewInit {
  chat: any;
  message: string;
  messages: any;

  constructor(private router: Router, private visitorSocketService: VisitorSocketService) { 
      this.visitorSocketService.onConnectionWithAgent().subscribe(chat => {
        console.log(chat);
        this.chat = chat;
      });

      this.visitorSocketService.onError().subscribe(error => {
        console.log(JSON.stringify(error))
      });
      
      this.visitorSocketService.onGetLocation().subscribe(() => {
        console.log("visitor...getLocation");
        window.parent.postMessage("getLocation", "*");
      });
      
      this.visitorSocketService.onNextChat().subscribe(chat => {
        console.log("onNextChat");
        console.log(chat)
        this.chat = chat;
        if(chat["messages"]){
          let chatMessages = chat["messages"]
          for (var i = 0; i < chatMessages.length; i++) {
            chatMessages[i].time = moment(new Date(chatMessages[i].date)).format('HH:mm');
          };
          this.messages = chatMessages;
        }
      });

      this.visitorSocketService.onReceiveMessage().subscribe(message => {
        message["time"] = moment(new Date(message["date"])).format('HH:mm');
        this.messages.unshift(message);
      });
    }

  ngOnInit() {
    this.visitorSocketService.init(localStorage.getItem('visitor-help-chat-token'));
    console.log("ngOnInit /chat/content");
    this.messages = [];
    this.chat = "";
  }

  ngAfterViewInit() {
    this.visitorSocketService.emitConnectWithAgent();
  }
  
  ngOnDestroy() {
    localStorage.setItem("disconnect", "1"); 
    localStorage.removeItem("openchat");
    this.visitorSocketService.disconnect();
    this.router.navigate(['/chat/rating', this.chat._id]);
  }

  sendMessage(){
    if(this.message !== "") { 
      this.visitorSocketService.emitSendMessage(this.message);
    }
    this.message = "";
  }
  
  @HostListener('window:message', ['$event'])
    onMessage(event) {
      if (event.data.res == "locationChange") {
        let location = event.data.data.toString();
        this.visitorSocketService.emitLocationChange(location);
      }
  }
}
