import { Component, OnInit, HostListener } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { VisitorSocketService } from 'src/app/services/visitor-socket.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-chatting-window',
  templateUrl: './chatting-window.component.html'
})
export class ChattingWindowComponent implements OnInit {
  chat: any;
  message: string;

  constructor(private router: Router, private visitorSocketService: VisitorSocketService) { 
      this.visitorSocketService.init(localStorage.getItem('visitor-help-chat-token'));
      this.visitorSocketService.onConnectionWithAgent().subscribe(chat => {
        this.chat = chat;
        window.parent.postMessage("getLocation", "*");
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
        if(chat["messages"]){
          let chatMessages = chat["messages"]
          for (var i = 0; i < chatMessages.length; i++) {
            chatMessages[i].time = moment(new Date(chatMessages[i].date)).format('HH:mm');
          };
          this.chat.messages = chatMessages;
        }
      });

      this.visitorSocketService.onReceiveMessage().subscribe(message => {
        message["time"] = moment(new Date(message["date"])).format('HH:mm');
        this.chat.messages.push(message);
      });
    }

  ngOnInit() {
    this.chat = "";
    this.visitorSocketService.emitConnectWithAgent();
  }
  
  ngOnDestroy() {
    this.router.navigate(['/chat/rating', this.chat._id]);
    this.visitorSocketService.disconnect();
  }

  sendMessage(){
    if(this.message !== "") {
      let contnet = {
        content: this.message,
        time: moment(new Date()).format('HH:mm'),
        sender: 'agent'
      }
      this.chat.messages.push(contnet);
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
