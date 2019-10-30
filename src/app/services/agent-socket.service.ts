import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AgentSocketService {
  readonly apiURL: string = environment.baseUrl;
  private socket = io(this.apiURL + "/agent");
  
  constructor() { }

  init(token) {
    this.socket.emit('init', token);
  }

  // connect(token){
  //   this.socket = io(this.apiURL + "/agent", {
  //       query: {
  //         token: token
  //       }
  //     });
  // }

  disconnect(){
    this.socket.disconnect();
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
  
  onNewMessage() {
    const observable = new Observable(observer => {
      this.socket.on('newMessage', (newMessage) => {
        observer.next(newMessage);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
 
  emitGetLocation(){
    this.socket.emit("getLocation");
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
 
  // emitGetChats(){
  //   this.socket.emit("getChats");
  // }
 
  emitSwitchRoom(room: string){
    console.log("switchRoom: " + room);
    this.socket.emit("switchRoom", room);
  }
 
  emitSendMessage(message: string){
    this.socket.emit("sendMessage", message);
  }

  onReceiveMessage() {
    const observable = new Observable(observer => {
      this.socket.on('receiveMessage', (receiveMessage) => {
        observer.next(receiveMessage);
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