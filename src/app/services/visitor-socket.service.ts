import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VisitorSocketService {
  readonly apiURL: string = environment.baseUrl; 
  private socket;
  
  constructor() {
    this.socket = io(this.apiURL);// + "/visitor")
   }

  init(token) {
    this.socket.emit('init', token, "visitor");
  }

  // connect(token){
  //   this.socket = io(this.apiURL + "/visitor", {
  //       query: {
  //         token: token
  //       }
  //     });
  // }

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
      this.socket.on('connectionWithAgent', (chat) => {
        observer.next(chat);    
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
        observer.next();
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  onNextChat() {
    const observable = new Observable(observer => {
      this.socket.on('nextChat', (chat) => {
        observer.next(chat);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
 
  emitLocationChange(location: string){
    this.socket.emit("locationChange", location);
  }
 
  emitSendMessage(message: string){
    this.socket.emit("message", message);
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
 