import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  readonly apiURL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  sendMail(token: string, mail: any) {
    var body = JSON.stringify({sender: mail.sender, subject: mail.subject, text: mail.text});
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.post(this.apiURL + '/mail/sendMail', body, {headers: reqHeader});
}
}
