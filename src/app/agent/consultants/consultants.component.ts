import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { WorkHoursService } from 'src/app/services/work-hours.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html'
})

export class ConsultantsComponent implements OnInit {
  isFilter: boolean = false;
  isSearch: boolean = false;

  isDataError: boolean;
  isEmailError: boolean;
  isAddedSuccess: boolean = false;
  isEditedSuccess: boolean = false;
  isAccountEditSuccess: boolean;

  isEditing: boolean;
  isAdding: boolean = false;

  user: Agent;
  agents: any;

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.isDataError = false;
    this.isEmailError = false;
    this.isAccountEditSuccess = false;
    this.isEditing = false;
    this.isAdding = false;
    this.agents = [];
    this.getAgents();
    this.resetUser();
  }

  onCloseClick() {
    this.isEditing = false;
  }

  onDataError(){
    this.isDataError = true;
  }

  onFormSubmit(form: NgForm){
    if(this.isAdding){
      this.add(form);
    }
    if(this.isEditing){
      this.edit(form);
    }
  }

  getAgents(){
    this.agentService.getAgents(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      console.log("AGENTS: " + JSON.stringify(data.users))
      this.agents = data.users;
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  add(form: NgForm) {
    this.agentService.createAgent(localStorage.getItem('agent-help-chat-token'), form.value).subscribe((data: any) => {
      this.getAgents();
      this.isAdding = false;
      this.isAddedSuccess = true;
      setTimeout(()=>{
        this.isAddedSuccess = false;
      }, 3000);
    },
    (err: HttpErrorResponse) => {
        this.isEmailError = true;
    });
  }

  edit(form: NgForm) {
    this.agentService.updateAgent(localStorage.getItem('agent-help-chat-token'), this.user._id, form.value).subscribe((data: any) => {
      this.getAgents();
      this.isEditing = false;
      this.isEditedSuccess = true;
      setTimeout(()=>{
        this.isEditedSuccess = false;
      }, 3000);
    },
    (err: HttpErrorResponse) => {
      this.isEmailError = true;
    });
  }

  editAgent(agentId: string) {
    this.agentService.getAgentInformation(localStorage.getItem('agent-help-chat-token'), agentId).subscribe((data: any) => {
      console.log("AGENT: " + JSON.stringify(data.user))
      this.user = data.user;
      this.isEditing = true;
    },
    (err: HttpErrorResponse) => {
      //
    });
  }

  showFilter() {
    this.isFilter = !this.isFilter;
  }

  showSearch() {
    this.isSearch = !this.isSearch;
  }

  showAddAgentForm() {
    this.user = {
      _id: '',
      firstname: '',
      lastname: '',
      email:	'',
      password:	''
    };
    this.isAdding = true;
  }

  close() {
    this.isAdding = false;
    this.isEditing = false;
  }

  deleteAgent(agentId: string) {
    this.agentService.deleteAgent(localStorage.getItem('agent-help-chat-token'), agentId).subscribe((data: any) => {
      this.getAgents();
    },
    (err: HttpErrorResponse) => {
      //
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