import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html'
})
export class ConsultantsComponent implements OnInit {
  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  lastnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;

  isFilter: boolean = false;
  isSearch: boolean = false;
  isAdding: boolean = false;
  isEditing: boolean = false;
  isAddedSuccess: boolean = false;
  isEditedSuccess: boolean = false;
  isError: boolean = false;
  
  user: Agent = {
    _id: '',
    firstname: '',
    lastname: '',
    email:	'',
    password:	''
  };

  agents: any = '';

  constructor(private agentService: AgentService, private router: Router) { }

  ngOnInit() {
    this.getAgents();
  }
  
  OnSubmit(form: NgForm) {
    if(this.isAdding){
      this.add(form);
    }
    if(this.isEditing){
      this.edit(form);
    }
  } 

  getAgents(){
    this.agentService.getAgents(localStorage.getItem('userToken')).subscribe((data: any) => {
      this.agents = data.data.user;
    },
    (err: HttpErrorResponse) => {
      // !!!
    });
  }

  add(form: NgForm) {
    this.agentService.createAgent(localStorage.getItem('userToken'), form.value).subscribe((data: any) => {
      console.log(JSON.stringify(data))
      this.getAgents();
      this.isAdding = false;
      this.isAddedSuccess = true;
      setTimeout(()=>{
        this.isAddedSuccess = false;
      }, 3000);
    },
    (err: HttpErrorResponse) => {
        this.isError = true;
    });
  }

  edit(form: NgForm) {
    this.agentService.updateAgent(localStorage.getItem('userToken'), this.user._id, form.value).subscribe((data: any) => {
      console.log(JSON.stringify(this.user._id))
      this.isEditing = false;
      this.isEditedSuccess = true;
      setTimeout(()=>{
        this.isEditedSuccess = false;
      }, 3000);
    },
    (err: HttpErrorResponse) => {
        this.isError = true;
    });
  }

  editAgent(agentId: string) {
    this.agentService.getAgentInformation(localStorage.getItem('userToken'), agentId).subscribe((data: any) => {
      this.user = data.data.user;
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
    this.agentService.deleteAgent(localStorage.getItem('userToken'), agentId).subscribe((data: any) => {
      this.getAgents();
    },
    (err: HttpErrorResponse) => {
      //
    });

  }
}