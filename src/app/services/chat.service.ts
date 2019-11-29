import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly apiURL: string = environment.baseUrl;
 
  constructor(private http: HttpClient) { } 

  getChats(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/chats', {headers: reqHeader});
  }

  getChat(chatId: string, token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/chats/' + chatId, {headers: reqHeader});
  }

  disactiveChat(token: string, pagehide: boolean){
    if(pagehide){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("PUT", this.apiURL + '/chats/disactiveChat', false);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.setRequestHeader("x-access-token", token);
      xmlhttp.send();
    } else {
      var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
      return this.http.put(this.apiURL + '/chats/disactiveChat', {}, {headers: reqHeader});
    }
  }
  
  getArchiveChats(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/chats/archive', {headers: reqHeader});
  }
  
  getVisitorAgent(visitorId: string, token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/chats/agent/' + visitorId, {headers: reqHeader});
  }
  
  getAgent(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/chats/agent/', {headers: reqHeader});
  }

  rateChat(token: string, chatId: string, rating: number){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.put(this.apiURL + '/chats/rating/' + chatId, {rating: rating}, {headers: reqHeader});
  }

  delete(token: string, chatId: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.delete(this.apiURL + '/chats/' + chatId, {headers: reqHeader});
  }
}