import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import io from 'socket.io-client';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AgentSocketService {
  readonly apiURL: string = environment.baseUrl;
  private socket = io(this.apiURL);
  constructor() { }

  joinRoom(data) {
    console.log('join ' + data);
    this.socket.emit('joinRoom', data);
  }

  onLocationChange() {
    const observable = new Observable<{location: String}>(observer => {
      this.socket.on('locationChange', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}