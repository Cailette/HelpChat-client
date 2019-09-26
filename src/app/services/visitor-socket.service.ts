import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { Visitor } from '../models/visitor.model';

@Injectable({
  providedIn: 'root'
})

export class VisitorSocketService {
  readonly apiURL: string = environment.baseUrl;
  private socket = io(this.apiURL);
 
  constructor(private http: HttpClient) { }
  
  joinRoom(data) {
    console.log('join ' + data);
    this.socket.emit('joinRoom', data);
  }
 
  emitLocationChange(location: string){
    console.log("locationChange: " + location);
    this.socket.emit("locationChange", location);
  }
}
 