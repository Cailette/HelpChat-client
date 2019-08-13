import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit {

  user: User;
  firstnamePattern = /^(?=.*[a-z]).{2,20}$/;
  surnamePattern = /^(?=.*[a-z]).{2,20}$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;

  isRegisterError: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  OnSubmit(form: NgForm) {
    
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      imie: '',
      nazwisko: '',
      email:	'',
      password:	''
    }
  }

}
