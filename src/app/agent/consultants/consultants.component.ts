import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
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
  isAdding: boolean;

  user: Agent;
  agents: any;

  deleteAgent: string;

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
    this.isAdding = false;
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

  showFilter() {
    this.isFilter = !this.isFilter;
  }

  showSearch() {
    this.isSearch = !this.isSearch;
  }

  newAgent() {
    this.resetUser();
    this.isAdding = true;
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

  getAgents(){
    this.agentService.getAgents(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.agents = data.users;
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  editSelectedAgent(agentId: string) {
    this.agentService.getAgentInformation(localStorage.getItem('agent-help-chat-token'), agentId).subscribe((data: any) => {
      this.user = data.user;
      this.isEditing = true;
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  deleteSelectedAgent(agentId: string) {
    this.deleteAgent = agentId;
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

  delete(){
    this.agentService.deleteAgent(localStorage.getItem('agent-help-chat-token'), this.deleteAgent).subscribe((data: any) => {
      this.getAgents();
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }
}