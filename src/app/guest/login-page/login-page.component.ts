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

  constructor(private guestService: GuestService, private router: Router) { }

  ngOnInit() {

  }

  OnSubmit(email, password) {
    this.guestService.authenticate(email, password).subscribe((data: any) => {
      console.log(JSON.stringify(data.data.token));
      console.log(JSON.stringify(data.token));
      console.log(JSON.stringify(data));
      localStorage.setItem('userToken', data.data.token);
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

}
