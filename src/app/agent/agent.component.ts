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

  constructor(private agentService: AgentService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.agentService.getAccountInformation(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.isActive = data.user.isActive;
    },
    (err: HttpErrorResponse) => {
      //
    });
  }
  
  ngOnDestroy() {
    this.agentService.switchActivity(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      //
    },
    (err: HttpErrorResponse) => {
      // this.snackBar.open('Błąd przy zmianie statusu!'); // HALO OOOO 
    });
  }

  Logout() {
    this.agentService.switchActivity(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      localStorage.removeItem('agent-help-chat-token');
      this.router.navigate(['/']);
    },
    (err: HttpErrorResponse) => {
      // this.snackBar.open('Błąd przy zmianie statusu!'); // HALO OOOO 
    });
  }

  SwitchActivity() {
    this.agentService.switchActivity(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.isActive = !this.isActive;
    },
    (err: HttpErrorResponse) => {
      // this.snackBar.open('Błąd przy zmianie statusu!'); // HALO OOOO 
    });
  }
}