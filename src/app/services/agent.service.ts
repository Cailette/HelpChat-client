import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  readonly apiURL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAccountInformation(token: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/users/account-information', {headers: reqHeader});
  }

  switchActivity(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.put(this.apiURL + '/users/switch-activity', {}, {headers: reqHeader});
  }

  updateAccount(token: string, user: User){
    const userBody: User = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    }
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.put(this.apiURL + '/users/account-information', userBody, {headers: reqHeader});
  }

  deleteAccount(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.delete(this.apiURL + '/users/account', {headers: reqHeader});
  }
}