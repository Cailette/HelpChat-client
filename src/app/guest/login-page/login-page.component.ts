import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})

export class LoginPageComponent implements OnInit {
  isLoginError: boolean = false;
  constructor(
    private guestService: GuestService, 
    private router: Router
  ) { }

  ngOnInit() { }

  OnSubmit(email, password) {
    this.guestService.authenticate(email, password)
    .subscribe(
      (data: any) => {
        localStorage.setItem('agent-help-chat-token', data.token);
        this.router.navigate(['/home/chats']);
      },
      (err: HttpErrorResponse) => { this.isLoginError = true; });
  }
}
