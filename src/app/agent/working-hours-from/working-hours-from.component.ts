import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { WorkHoursService } from 'src/app/services/work-hours.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { WorkingHoursTabComponent } from '../working-hours-tab/working-hours-tab.component';

@Component({
  selector: 'app-working-hours-from',
  templateUrl: './working-hours-from.component.html',
  styles: []
})
export class WorkingHoursFromComponent implements OnInit {
  @ViewChild(WorkingHoursTabComponent, {static: false}) childWorkingHoursTab: WorkingHoursTabComponent;
  
  @Output() getWorkHours = new EventEmitter<boolean>();
  @Output() dataError = new EventEmitter<boolean>();
  isDataError: boolean;
  isEditing: boolean;
  workDay: any;

  constructor(private workHoursService: WorkHoursService, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    console.log("ngOnInit")
    this.isDataError = false;
    this.isEditing = true;
    this.resetWorkDay()
  }
  
  OnSubmit(form: NgForm) {
    console.log("OnSubmit")
    console.log(JSON.stringify(form.value))
    this.workHoursService.createWorkHours(localStorage.getItem('agent-help-chat-token'), form.value).subscribe((data: any) => {
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
    console.log("resetWorkDay")
    this.workDay = {
      dayOfWeek: "",
      hourFrom: "",
      hourTo: "",
    }
  }
}
