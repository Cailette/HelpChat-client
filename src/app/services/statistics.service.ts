import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  readonly apiURL: string = environment.baseUrl;
 
  constructor(private http: HttpClient) { } 

  getChatStatistics(token: string, selected: string, filterChatAgent: string, filterChatDate: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + `/statistics/chats/${selected}/${filterChatAgent}/${filterChatDate}`, {headers: reqHeader});
  }

  getAgentStatistics(token: string, selected: string, filterChatAgent: string, filterChatDate: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + `/statistics/agents/${selected}/${filterChatAgent}/${filterChatDate}`, {headers: reqHeader});
  }
}
