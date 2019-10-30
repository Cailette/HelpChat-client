import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Chat } from '../models/chat.model';

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
  
  getArchiveChats(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/chats/archive', {headers: reqHeader});
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