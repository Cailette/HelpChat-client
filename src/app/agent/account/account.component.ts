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
  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  lastnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;

  isAccountError: boolean = false;
  isEditError: boolean = false;
  isAccountSucces: boolean = false;
  isEditing: boolean = false;

  user: User = {
    firstname: '',
    lastname: '',
    email:	'',
    password:	''
  };

  workDay: any = {
    dayOfWeek: "",
    hourFrom: "",
    hourTo: "",
  };

  workingDays: any = '';

  constructor(private workHoursService: WorkHoursService, private agentService: AgentService, private router: Router, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    this.agentService.getAccountInformation(localStorage.getItem('userToken')).subscribe((data: any) => {
      this.user = data.data.user;
      this.getAgentWorkHours();
    },
    (err: HttpErrorResponse) => {
      this.isAccountError = true;
    });
  }

  getAgentWorkHours(){
    this.workHoursService.getWorkHours(localStorage.getItem('userToken')).subscribe((data: any) => {
      this.workingDays = data.data;
      this.workingDays.map(d => d.dayOfWeek = this.days.find(x => x.number === d.dayOfWeek).day);
    },
    (err: HttpErrorResponse) => {
        //
    });
  }

  resetWorkDay() {
    this.workDay = {
      dayOfWeek: "",
      hourFrom: "",
      hourTo: "",
    }
  }

  addWornikgHours() {
    console.log("this.workDay " + JSON.stringify(this.workDay))
    this.workHoursService.createWorkHours(localStorage.getItem('userToken'), this.workDay).subscribe((data: any) => {
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

  edit() {
    this.isEditing = true;
  }

  close() {
    this.isEditing = false;
  }

  delete() {
    this.agentService.deleteAccount(localStorage.getItem('userToken')).subscribe((data: any) => {
      localStorage.removeItem('userToken');
      this.router.navigate(['/']);
    },
    (err: HttpErrorResponse) => {
        this.isEditError = true;
    });
  }
  
  OnSubmit(form: NgForm) {
    this.agentService.updateAccount(localStorage.getItem('userToken'), form.value).subscribe((data: any) => {
      console.log(JSON.stringify(data))
      this.isEditing = false;
      this.isAccountSucces = true;
      this.getAgentWorkHours();
      setTimeout(()=>{
        this.isAccountSucces = false;
      }, 3000);
    },
    (err: HttpErrorResponse) => {
        this.isEditError = true;
    });
  }
}
