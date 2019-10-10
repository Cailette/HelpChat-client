import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitorSocketService } from 'src/app/services/visitor-socket.service';

@Component({
  selector: 'app-chatting-window',
  templateUrl: './chatting-window.component.html'
})
export class ChattingWindowComponent implements OnInit {
  agent: Agent;

  constructor(
    private agentService: AgentService, 
    private visitorSocketService: VisitorSocketService, 
    private router: Router) { }

  ngOnInit() {
    this.resetAgent();
    this.getAgent();
  }

  resetAgent(){
    this.agent = {
      _id:        "",
      firstname:  "",
      lastname:   "",
      password:   "",
      email:	    ""
    }
  }

  getAgent(){
    this.agentService.getRandomWorkingAgent(localStorage.getItem('visitor-help-chat-token')).subscribe((data: any) => {
      console.log("AGETN DATA" + JSON.stringify(data));
      this.agent = {
        _id: data.user._id,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        email: data.user.emal,
        password: "",
      }
      window.parent.postMessage("show", "*");
    },
    (err: HttpErrorResponse) => {
      window.parent.postMessage("show", "*");
      this.router.navigate(['/chat/mail']);
    });
  }


  
}
