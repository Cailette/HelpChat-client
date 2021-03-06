import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class GuestService {
  readonly apiURL: string = environment.baseUrl;

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
      var body = JSON.stringify({email: email, password: password});
      var reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.apiURL + '/users/authenticate', body, {headers: reqHeader});
  }

}
