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
  
  emitConnectWithAgent() {
    this.socket.emit('connectWithAgent');
  }

  onConnectionWithAgent() {
    console.log("onConnectionWithAgent");
    const observable = new Observable<{agent: Object}>(observer => {
      this.socket.on('connectionWithAgent', (agent) => {
        observer.next(agent);
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
 