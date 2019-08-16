import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  lastnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;

  isAccountError: boolean = false;
  isEditing: boolean = false;
  user: User;

  constructor(private agentService: AgentService, private router: Router) { }

  ngOnInit() {
    this.agentService.getAccountInformation(localStorage.getItem('userToken')).subscribe((data: any) => {
      this.user = data.data.user;
      console.log(JSON.stringify(data.data.user));
    },
    (err: HttpErrorResponse) => {
      this.isAccountError = true;
    });
  }

  edit() {
    this.isEditing = true;
  }

  close() {
    this.isEditing = false;
  }
}
