import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { AgentService } from 'src/app/services/agent.service';
import { NgForm } from '@angular/forms';
import { WorkHoursService } from 'src/app/services/work-hours.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  isAccountError: boolean;
  isAccountEditSuccess: boolean;
  isEditing: boolean;
  user: User;
  workingDays: any;

  constructor(private workHoursService: WorkHoursService, private agentService: AgentService, private router: Router, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    this.resetUser();
    this.isAccountError = false;
    this.isAccountEditSuccess = false;
    this.isEditing = false;
    this.workingDays = [];

    this.agentService.getAccountInformation(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.user = data.user;
      this.getAgentWorkHours();
    },
    (err: HttpErrorResponse) => {
      this.isAccountError = true;
    });
  }
  
  onEditInformationClick(){
    this.isEditing = true;
  }

  onCloseClick() {
    this.isEditing = false;
  }

  onAccountError(){
    this.isAccountError = true;
  }

  onEditSubmit(){
    this.isEditing = false;
    this.isAccountEditSuccess = true;
    this.getAgentWorkHours();
    setTimeout(()=>{
      this.isAccountEditSuccess = false;
    }, 3000);
  }

  onGetWorkHours(){
    this.getAgentWorkHours();
  }

  getAgentWorkHours(){
    this.workHoursService.getWorkHours(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.workingDays = data.workHours;
      this.workingDays.map(d => d.dayOfWeek = this.days.find(x => x.number === d.dayOfWeek).day);
    },
    (err: HttpErrorResponse) => {
      this.isAccountError = true;
    });
  }

  resetUser(){
    this.user = {
      firstname: '',
      lastname: '',
      email:	'',
      password:	''
    };
  }
}
