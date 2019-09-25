import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { WorkHoursService } from 'src/app/services/work-hours.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-working-hours-tab',
  templateUrl: './working-hours-tab.component.html'
})
export class WorkingHoursTabComponent implements OnInit {
  @Output() dataError = new EventEmitter<boolean>();
  @Output() getWorkHours = new EventEmitter<boolean>();
  @Input() isEditing: boolean;
  @Input() agentId: string;
  workingDays: any;

  constructor(private workHoursService: WorkHoursService, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    this.workingDays = [];
    this.getAgentWorkHours();
  }

  getAgentWorkHours(){
    this.workHoursService.getAgentWorkHours(localStorage.getItem('agent-help-chat-token'), this.agentId).subscribe((data: any) => {
      this.workingDays = data.workHours;
      this.workingDays.map(d => d.dayOfWeek = this.days.find(x => x.number === d.dayOfWeek).day);
    },
    (err: HttpErrorResponse) => {
      this.dataError.emit();
    });  
  }

  deleteWorkingHours(workingHoursId: string) {
    this.workHoursService.deleteWorkHours(localStorage.getItem('agent-help-chat-token'), workingHoursId).subscribe((data: any) => {
      this.getAgentWorkHours();
    },
    (err: HttpErrorResponse) => {
      this.dataError.emit();
    });
  }
}
