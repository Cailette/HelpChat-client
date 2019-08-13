import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  isLoginError: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(email, password) {
    
  }

}
