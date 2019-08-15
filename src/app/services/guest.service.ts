import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class GuestService {
  readonly apiURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  register(user: User) {
      const userBody: User = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      }
      return this.http.post(this.apiURL + '/users/register', userBody);
  }

  authenticate(email: String, password: String) {
      var data = JSON.stringify({email: email, password: password});
      var reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.apiURL + '/users/authenticate', data, {headers: reqHeader});
  }

}
