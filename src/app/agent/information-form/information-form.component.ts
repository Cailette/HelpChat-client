import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';

import { WorkHoursService } from 'src/app/services/work-hours.service';
import { AgentService } from 'src/app/services/agent.service';
import { NgForm } from '@angular/forms';
import { WorkDay } from 'src/app/models/workDay';
import { Agent } from 'src/app/models/agent.model';
import { WorkingHoursTabComponent } from '../working-hours-tab/working-hours-tab.component';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styles: [],
})

export class InformationFormComponent implements OnInit {
  @ViewChild(WorkingHoursTabComponent, {static: false}) childWorkingHoursTab: WorkingHoursTabComponent;
  
  @Input() user: Agent;
  @Output() closeClick = new EventEmitter<boolean>();
  @Output() accountError = new EventEmitter<boolean>();
  @Output() editSubmit = new EventEmitter<NgForm>();
  @Input() isAdding: boolean;
  @Input() isEmailError: boolean;
  isEditing: boolean;

  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  lastnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
  
  constructor() { }

  ngOnInit() {
    this.isEditing = true;
    this.isEmailError = false;
  }

  onAccountError(){
    this.accountError.emit()
  }

  onGetWorkHours(){
    this.childWorkingHoursTab.getAgentWorkHours();
  }

  close(){
    this.closeClick.emit();
  }
  
  OnSubmit(form: NgForm) {
      this.editSubmit.emit(form)
  }

  onShareWorkingHours(){
    
  }
}