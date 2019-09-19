import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';

import { WorkHoursService } from 'src/app/services/work-hours.service';
import { AgentService } from 'src/app/services/agent.service';
import { NgForm } from '@angular/forms';
import { WorkDay } from 'src/app/models/workDay';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styles: []
})
export class EditInformationComponent implements OnInit {
  @Input() workingDays: any;
  @Input() user: User;
  @Output() closeClick = new EventEmitter<boolean>();
  @Output() accountError = new EventEmitter<boolean>();
  @Output() editSubmit = new EventEmitter<boolean>();
  @Output() getWorkHours = new EventEmitter<boolean>();

  isEditError: boolean;
  workDay: any;

  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  lastnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
  
  constructor(
    private workHoursService: WorkHoursService, 
    private agentService: AgentService,
    @Inject('DAYS') public days: any[]
    ) { }

  ngOnInit() {
    this.isEditError = false;
    this.resetWorkDay();
  }

  close(){
    this.closeClick.emit();
  }

  resetWorkDay() {
    this.workDay = {
      dayOfWeek: "",
      hourFrom: "",
      hourTo: "",
    }
  }
  
  addWornikgHours() {
    this.workHoursService.createWorkHours(localStorage.getItem('agent-help-chat-token'), this.workDay).subscribe((data: any) => {
      this.getWorkHours.emit();
      this.resetWorkDay();
    },
    (err: HttpErrorResponse) => {
      this.accountError.emit();
    });
  }

  deleteWorkingHours(workingHoursId: string) {
    this.workHoursService.deleteWorkHours(localStorage.getItem('agent-help-chat-token'), workingHoursId).subscribe((data: any) => {
      this.getWorkHours.emit();
    },
    (err: HttpErrorResponse) => {
      this.accountError.emit();
    });
  }
  
  OnSubmit(form: NgForm) {
    this.agentService.updateAccount(localStorage.getItem('agent-help-chat-token'), form.value).subscribe((data: any) => {
      console.log(JSON.stringify(data))
      this.editSubmit.emit()
    },
    (err: HttpErrorResponse) => {
        this.isEditError = true;
    });
  }

}
