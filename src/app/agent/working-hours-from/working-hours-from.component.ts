import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { WorkHoursService } from 'src/app/services/work-hours.service';
import { AgentService } from 'src/app/services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-working-hours-from',
  templateUrl: './working-hours-from.component.html',
  styles: []
})
export class WorkingHoursFromComponent implements OnInit {
  @Output() getWorkHours = new EventEmitter<boolean>();
  @Output() accountError = new EventEmitter<boolean>();
  workDay: any;

  constructor(private workHoursService: WorkHoursService, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    console.log("Init")
    this.resetWorkDay()
  }
  
  
  OnSubmit(form: NgForm) {
    console.log("OnSubmit")
    this.workHoursService.createWorkHours(localStorage.getItem('agent-help-chat-token'), this.workDay).subscribe((data: any) => {
      // this.getWorkHours.emit();
      this.resetWorkDay();
      console.log("After submit")
    },
    (err: HttpErrorResponse) => {
      this.accountError.emit();
    });
  }

  resetWorkDay() {
    console.log("Reset")
    this.workDay = {
      dayOfWeek: "",
      hourFrom: "",
      hourTo: "",
    }
  }
}
