import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Agent } from 'src/app/models/agent.model';
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
  isEmailError: boolean;
  user: Agent;
  action: string;

  constructor(private workHoursService: WorkHoursService, private agentService: AgentService, private router: Router, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    this.resetUser();
    this.isAccountError = false;
    this.isAccountEditSuccess = false;
    this.isEditing = false;
    this.isEmailError = false;

    this.agentService.getAccountInformation(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.user = data.user;
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

  onEditSubmit(form: NgForm){
    this.agentService.updateAccount(localStorage.getItem('agent-help-chat-token'), form.value).subscribe((data: any) => {
      this.isEditing = false;
      this.isAccountEditSuccess = true;
      setTimeout(()=>{
        this.isAccountEditSuccess = false;
      }, 3000);
    },
    (err: HttpErrorResponse) => {
        this.isEmailError = true;
    });
  }

  resetUser(){
    this.user = {
      _id: '',
      firstname: '',
      lastname: '',
      email:	'',
      password:	''
    };
  }
}
