import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentService } from 'src/app/services/agent.service';
import { AgentSocketService } from '../services/agent-socket.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})

export class AgentComponent implements OnInit {
  isActive: boolean;
  isDataError: boolean;

  newChatCounter: number;

  constructor(private agentService: AgentService, private router: Router, private agentSocketService: AgentSocketService) { 
    this.agentSocketService.init(localStorage.getItem('agent-help-chat-token'));

    this.agentSocketService.onNewChat().subscribe(data => {
      this.incrementNewChatCounter();
    });

    // this.agentSocketService.onNewMessage().subscribe(data => {
    //   console.log(".NEWMESSAGEINCHAT." + JSON.stringify(data))
    // });

    this.agentSocketService.onError().subscribe(error => {
      console.log(JSON.stringify(error))
      this.isDataError = true;
      setTimeout(()=>{
        this.isDataError = false;
      }, 3000);
    });
  }

  ngOnInit() {
    this.resetNewChatCounter();
    this.isDataError = false;
    this.isActive = false;
    this.agentService.getAccountInformation(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.isActive = data.user.isActive;
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }
  
  ngOnDestroy() {
    if(this.isActive){
      this.SwitchActivity();
    }
    this.agentSocketService.disconnect();
  }

  Logout() {
    if(this.isActive){
      this.SwitchActivity();
    }
    localStorage.removeItem('agent-help-chat-token');
    this.router.navigate(['/']);
  }

  SwitchActivity() {
    this.agentService.switchActivity(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.isActive = !this.isActive;
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  resetNewChatCounter(){
      this.newChatCounter = 0;
  }

  incrementNewChatCounter(){
    if(this.router.url !== '/home/chats'){
      this.newChatCounter = this.newChatCounter + 1;
    }
  }
}