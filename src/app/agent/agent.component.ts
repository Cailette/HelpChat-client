import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentService } from 'src/app/services/agent.service';
import { AgentSocketService } from '../services/agent-socket.service';
import { GlobalRole, Role } from '../auth/Role';

@Component({
  providers: [AgentSocketService],
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})

export class AgentComponent implements OnInit {
  role: string;
  Representative: string;
  isActive: boolean;
  isDataError: boolean;

  newChatCounter: number;

  private onNewChatSubscribtion: any;
  private onDisconnectChatSubscribtion: any;
  private onErrorSubscribtion: any;

  constructor(private authorization: Role, private globalRole: GlobalRole, private agentService: AgentService, private router: Router, private agentSocketService: AgentSocketService) { 
    this.checkRole();
    this.role = this.globalRole.role;
    this.Representative = this.globalRole.Representative;
  }

  private checkRole() {
    this.authorization.isAuthorized();
  }

  ngOnInit() {
    this.agentSocketService.init(localStorage.getItem('agent-help-chat-token'));

    this.onNewChatSubscribtion = this.agentSocketService.onNewChat().subscribe(data => {
      console.log("onNewChat")
      this.incrementNewChatCounter();
    });

    this.onDisconnectChatSubscribtion = this.agentSocketService.onVisitorDisconnect().subscribe(data => {
      console.log("onVisitorDisconnect")
      this.decrementNewChatCounter();
    });

    this.onErrorSubscribtion = this.agentSocketService.onError().subscribe(error => {
      console.log(JSON.stringify(error))
      this.isDataError = true;
      setTimeout(()=>{
        this.isDataError = false;
      }, 3000);
    });

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
    this.onErrorSubscribtion.unsubscribe();
    this.onNewChatSubscribtion.unsubscribe();
    this.onDisconnectChatSubscribtion.unsubscribe();
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

  decrementNewChatCounter(){
    if(this.router.url !== '/home/chats' && this.newChatCounter > 0){
      this.newChatCounter = this.newChatCounter - 1;
    }
  }
}