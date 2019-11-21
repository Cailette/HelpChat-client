import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styles: []
})
export class MailFormComponent implements OnInit {
  mail: any;
  mailing: boolean;
  mailingError: boolean;
  emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

  constructor(
    private mailService: MailService
  ) { }

  ngOnInit() {
    this.mailing = true;
    this.mailingError = false;
    this.resetForm();
  }

  submit() {
    this.mailService.sendMail(localStorage.getItem('visitor-help-chat-token'), this.mail)
      .subscribe(
        (data: any) => { this.mailing = false; },
        (err: HttpErrorResponse) => {
          this.mailing = false;
          this.mailingError = true;
        }
      );
  }

  resetForm() {
    this.mail = {
      sender: '',
      subject: '',
      text: ''
    }
  }
}
