import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isDataError: boolean;

  constructor(private agentService: AgentService, private router: Router) { }

  ngOnInit() {
    this.isDataError = false;
    this.agentService.getAccountInformation(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }
}
