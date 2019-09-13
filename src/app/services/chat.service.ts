import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  readonly apiURL: string = environment.baseUrl;
  location = this.socket.fromEvent<string>('locationChange');

  constructor(private http: HttpClient, private socket: Socket) { } 
}
 