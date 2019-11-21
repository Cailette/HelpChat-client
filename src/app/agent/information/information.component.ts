import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { Agent } from 'src/app/models/agent.model';
import { GlobalRole } from '../../auth/Role';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html'
})
export class InformationComponent implements OnInit {
  role: string;
  Representative: string;

  @Input() user: Agent;
  @Output() editInformationClick = new EventEmitter<boolean>();
  @Output() dataError = new EventEmitter<boolean>();
  
  constructor(
    private agentService: AgentService, 
    private router: Router,
    private globalRole: GlobalRole
  ) { 
    this.role = this.globalRole.role;
    this.Representative = this.globalRole.Representative;
  }

  ngOnInit() { }

  onDataError() {
    this.dataError.emit();
    console.log("this.dataError.emit();")
  }

  editInformation() {
    this.editInformationClick.emit();
  }
  
  delete() {
    this.agentService.deleteAccount(localStorage.getItem('agent-help-chat-token'))
    .subscribe(
      (data: any) => {
        localStorage.removeItem('agent-help-chat-token');
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => { this.dataError.emit(); }
    );
  }
}
