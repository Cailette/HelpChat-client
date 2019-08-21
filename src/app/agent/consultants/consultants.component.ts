import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { WorkHoursService } from 'src/app/services/work-hours.service';
import { NgForm } from '@angular/forms';
import { WorkDay } from 'src/app/models/workDay';

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
    _id: "",
    firstname: "",
    lastname: "",
    email:	"",
    password:	"",
  };

  workDay: any = {
    dayOfWeek: "",
    hourFrom: "",
    hourTo: "",
  };

  agents: any = '';
  workingDays: any = '';

  constructor(private agentService: AgentService, private workHoursService: WorkHoursService, private router: Router, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    this.resetWorkDay();
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

  resetWorkDay() {
    this.workDay = {
      dayOfWeek: "",
      hourFrom: "",
      hourTo: "",
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
      this.getAgents();
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
      this.getAgentWorkHours();
    },
    (err: HttpErrorResponse) => {
      //
    });
  }

  getAgentWorkHours(){
    this.workHoursService.getAgentWorkHours(localStorage.getItem('userToken'), this.user._id).subscribe((data: any) => {
      this.workingDays = data.data;
      this.workingDays.map(d => d.dayOfWeek = this.days.find(x => x.number === d.dayOfWeek).day);
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

  addWornikgHours() {
    console.log("this.workDay " + JSON.stringify(this.workDay))
    this.workHoursService.createAgentWorkHours(localStorage.getItem('userToken'), this.workDay, this.user._id).subscribe((data: any) => {
      this.resetWorkDay();
      this.getAgentWorkHours();
    },
    (err: HttpErrorResponse) => {
      //
    });
  }

  deleteWorkingHours(workingHoursId: string) {
    console.log("this.workDay " + JSON.stringify(this.workDay))
    this.workHoursService.deleteWorkHours(localStorage.getItem('userToken'), workingHoursId).subscribe((data: any) => {
      this.getAgentWorkHours();
    },
    (err: HttpErrorResponse) => {
      //
    });
  }
}