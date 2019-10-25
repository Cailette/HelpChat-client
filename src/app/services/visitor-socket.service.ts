import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VisitorSocketService {
  readonly apiURL: string = environment.baseUrl;
  private socket: any; 

  constructor() { }

  connect(token){
    this.socket = io(this.apiURL + "/visitor", {
        query: {
          token: token
        }
      });
  }

  disconnect(){
      this.socket.disconnect();
  }

  onSwitchRoom() {
    const observable = new Observable(observer => {
      this.socket.on('switchRoom', () => {
        observer.next();
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
  emitConnectWithAgent() {
    this.socket.emit('connectWithAgent');
  }

  onConnectionWithAgent() {
    let observable = new Observable(observer => {
      this.socket.on('connectionWithAgent', (agent, chat) => {
        observer.next({agent, chat});    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

  onGetLocation() {
    const observable = new Observable(observer => {
      this.socket.on('getLocation', () => {
        console.log("getLocation");
        observer.next();
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  onNextChat() {
    const observable = new Observable<{messages: any, agent: any}>(observer => {
      this.socket.on('nextChat', (nextChat) => {
        console.log("nextChat");
        observer.next(nextChat);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
 
  emitLocationChange(location: string){
    console.log("locationChange: " + location);
    this.socket.emit("locationChange", location);
  }
 
  emitSendMessage(message: string){
    console.log("sendMessage: " + message);
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
 