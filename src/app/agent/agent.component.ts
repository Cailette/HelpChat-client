import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentService } from 'src/app/services/agent.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})

export class AgentComponent implements OnInit {
  isActive: boolean;

  constructor(private agentService: AgentService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.agentService.getAccountInformation(localStorage.getItem('userToken')).subscribe((data: any) => {
      this.isActive = data.data.user.isActive;
    },
    (err: HttpErrorResponse) => {
      //
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

  SwitchActivity() {
    this.agentService.switchActivity(localStorage.getItem('userToken')).subscribe((data: any) => {
      console.log(JSON.stringify(data));
      this.isActive = !this.isActive;
    },
    (err: HttpErrorResponse) => {
      // this.snackBar.open('Błąd przy zmianie statusu!'); // HALO OOOO 
    });
  }
}