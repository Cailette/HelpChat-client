import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AgentSocketService {
  readonly apiURL: string = environment.baseUrl;
  private socket: any; 
 
  constructor() { }

  connect(token){
    this.socket = io(this.apiURL + "/agent", {
        query: {
          token: token
        }
      });
  }

  disconnect(){
    this.socket.disconnect();
  }
  
  onNewChat() {
    const observable = new Observable<{newChat: string}>(observer => {
      this.socket.on('newChat', (newChat) => {
        observer.next(newChat);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
  onNewMessage() {
    const observable = new Observable<{newMessage: string}>(observer => {
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
    console.log("emitGetLocation");
    console.log("getLocation...");
    this.socket.emit("getLocation");
  }
  
  onVisitorLocationChange() {
    console.log("onVisitorLocationChange");
    const observable = new Observable<{location: string}>(observer => {
      this.socket.on('locationChange', (location) => {
        console.log("...agent locationChange");
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
    console.log("sendMessage: " + message);
    this.socket.emit("sendMessage", message);
  }

  onReceiveMessage() {
    const observable = new Observable<{receiveMessage: String}>(observer => {
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
    const observable = new Observable<{error: String}>(observer => {
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