import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AgentSocketService {
  readonly apiURL: string = environment.baseUrl;
  private socket = io(this.apiURL);
  
  constructor() { }

  init(token) {
    this.socket.emit('init', token, "agent");
  }

  disconnect(){
    this.socket.disconnect();
  }
 
  emitGetLocation(){
    this.socket.emit("getLocation");
  }
 
  emitSwitchRoom(room: string){
    console.log("switchRoom: " + room);
    this.socket.emit("switchRoom", room);
  }
 
  emitSendMessage(message: string){
    this.socket.emit("message", message);
  }
 
  emitCloseChat(){
    this.socket.emit("closeChat");
  }
  
  onNewChat() {
    const observable = new Observable(observer => {
      this.socket.on('newChat', () => {
        observer.next();
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
  onVisitorLocationChange() {
    const observable = new Observable(observer => {
      this.socket.on('locationChange', (location) => {
        observer.next(location);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  onReceiveMessage() {
    const observable = new Observable(observer => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  onChatListUpdate() {
    const observable = new Observable(observer => {
      this.socket.on('updateChatList', (chat) => {
        observer.next(chat);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  onVisitorDisconnect() {
    const observable = new Observable(observer => {
      this.socket.on('visitorDisconnect', (chatId) => {
        observer.next(chatId);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  onError() {
    const observable = new Observable(observer => {
      this.socket.on('error', (error) => {
        observer.next(error);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}