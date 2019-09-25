import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { WorkHoursService } from 'src/app/services/work-hours.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { WorkingHoursTabComponent } from '../working-hours-tab/working-hours-tab.component';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-working-hours-from',
  templateUrl: './working-hours-from.component.html'
})
export class WorkingHoursFromComponent implements OnInit {
  @ViewChild(WorkingHoursTabComponent, {static: false}) childWorkingHoursTab: WorkingHoursTabComponent;
  @Output() getWorkHours = new EventEmitter<boolean>();
  @Output() dataError = new EventEmitter<boolean>();
  agentId: string;
  agentFirstname: string;
  agentLastname: string;
  isDataError: boolean;
  isEditing: boolean;
  workDay: any;

  constructor(private _location: Location, private router: ActivatedRoute, private workHoursService: WorkHoursService, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    this.isDataError = false;
    this.isEditing = true;
    this.resetWorkDay();

    this.router.params.subscribe(params => {
      this.agentId = params['agentId'];
      this.agentFirstname = params['agentFirstname'];
      this.agentLastname = params['agentLastname'];
      console.log(this.agentId);
    });
  }
  
  OnSubmit(form: NgForm) {
    this.workHoursService.createAgentWorkHours(localStorage.getItem('agent-help-chat-token'), form.value, this.agentId).subscribe((data: any) => {
      this.childWorkingHoursTab.getAgentWorkHours();
      this.resetWorkDay();
    },
    (err: HttpErrorResponse) => {
      this.dataError.emit();
    });
  }
  
  onDataError(){
    this.isDataError = true;
  }

  resetWorkDay() {
    this.workDay = {
      dayOfWeek: "",
      hourFrom: "",
      hourTo: "",
    }
  }

  back() {
    this._location.back();
  }
}
