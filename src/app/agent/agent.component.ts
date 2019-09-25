import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentService } from 'src/app/services/agent.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'src/assets/css/app-main-style.css';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})

export class AgentComponent implements OnInit {
  isActive: boolean;
  isDataError: boolean;

  constructor(private agentService: AgentService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isDataError = false;
    this.agentService.getAccountInformation(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.isActive = data.user.isActive;
    },
    (err: HttpErrorResponse) => {
      //
    });
  }
  
  ngOnDestroy() {
    if(this.isActive){
      this.SwitchActivity();
    }
  }

  Logout() {
    if(this.isActive){
      this.SwitchActivity();
    }
    localStorage.removeItem('agent-help-chat-token');
    this.router.navigate(['/']);
  }

  SwitchActivity() {
    this.agentService.switchActivity(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.isActive = !this.isActive;
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }
}