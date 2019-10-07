import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})

export class RegisterPageComponent implements OnInit {
  user: User;
  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  lastnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;

  licenceNumber: any = "";

  isRegisterError: boolean = false;
  isRegistering: boolean = true;

  constructor(private router: Router, private guestService: GuestService) { }

  ngOnInit() {
    this.resetForm();
  }

  OnSubmit(form: NgForm) {
    this.guestService.register(form.value).subscribe((data: any) => {
      console.log(JSON.stringify(data))
      this.licenceNumber = data.user._id;
      this.isRegistering = false;
    },
    (err: HttpErrorResponse) => {
      console.log(JSON.stringify(err))

      this.isRegisterError = true;
    });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      firstname: '',
      lastname: '',
      email:	'',
      password:	''
    }
  }
}
