import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-chatting-window',
  templateUrl: './chatting-window.component.html'
})
export class ChattingWindowComponent implements OnInit {
  agent: Agent = {
    _id:        "",
    firstname:  "",
    lastname:   "",
    password:   "",
    email:	    ""
  }

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    // this.agentService.getWorkingAgent(localStorage.getItem('visitor-help-chat-token')).subscribe((data: any) => {
    //   console.log("AGETN DATA" + JSON.stringify(data));
    //   this.agent = {
    //     _id: data.user._id,
    //     firstname: data.user.firstname,
    //     lastname: data.user.lastname,
    //     email: data.user.emal,
    //     password: "",
    //   }

    //   this.isClose = false;
    //   this.isAgent = true;
    //   window.parent.postMessage("show", "*");
    //   this.router.navigate(['/chat/content']);
    // },
    // (err: HttpErrorResponse) => {
    //   this.isClose = false;
    //   this.isAgent = false;
    //   window.parent.postMessage("show", "*");
    //   this.router.navigate(['/chat/mail']);
    // });
  }
}
