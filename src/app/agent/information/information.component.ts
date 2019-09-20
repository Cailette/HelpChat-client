import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AgentService } from 'src/app/services/agent.service';

import { User } from 'src/app/models/user.model';
import { Agent } from 'src/app/models/agent.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styles: []
})
export class InformationComponent implements OnInit {
  @Input() user: Agent;
  @Output() editInformationClick = new EventEmitter<boolean>();
  @Output() dataError = new EventEmitter<boolean>();
  
  constructor(
    private agentService: AgentService, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  editInformation() {
    this.editInformationClick.emit();
  }
  
  //   NIE TESTOWANE
  delete() {
    this.agentService.deleteAccount(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      localStorage.removeItem('agent-help-chat-token');
      this.router.navigate(['/']);
    },
    (err: HttpErrorResponse) => {
      this.dataError.emit();
    });
  }
}
