import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

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
}
