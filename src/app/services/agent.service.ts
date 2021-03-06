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
    return this.http.get(this.apiURL + '/users/user', {headers: reqHeader});
  }
 
  switchActivity(token: string, pagehide: boolean){
    if(pagehide){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("PUT", this.apiURL + '/users/activity', false);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.setRequestHeader("x-access-token", token);
      xmlhttp.send();
    } else {
      var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
      return this.http.put(this.apiURL + '/users/activity', {}, {headers: reqHeader}); 
    }
  } 

  updateAccount(token: string, user: User){
    const userBody: User = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    }
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.put(this.apiURL + '/users/user', userBody, {headers: reqHeader});
  }

  deleteAccount(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.delete(this.apiURL + '/users/user', {headers: reqHeader});
  }

  deleteAgent(token: string, agentId: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.delete(this.apiURL + '/users/' + agentId, {headers: reqHeader});
  }

  createAgent(token: string, user: User){
    const userBody: User = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    }
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.post(this.apiURL + '/users/registerAgent', userBody, {headers: reqHeader});
  }

  getAgents(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/users', {headers: reqHeader});
  }

  updateAgent(token: string, agentId: string, user: User){
    const userBody: User = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    }
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.put(this.apiURL + '/users/' + agentId, userBody, {headers: reqHeader});
  }

  getAgentInformation(token: string, agentId: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/users/' + agentId, {headers: reqHeader});
  }
  
  getWorkingAgents(token: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/users/working-now', {headers: reqHeader});
  }
  
  getRandomWorkingAgent(token: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/users/working-random', {headers: reqHeader});
  }
  
  getRandomAgentEmail(token: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/users/email-random', {headers: reqHeader});
  }
}
