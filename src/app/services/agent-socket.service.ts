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

  // connect(token: string) {
  //   this.socket = io.connect(this.apiURL, {
  //     query: {
  //       token: token,
  //       sender: "Agent"
  //     }
  //   });

    // this.socket.on('locationChange', event => {
    //   runStoreAction(this.store.storeName, resolveAction[event.type], {
    //     payload: {
    //       entityIds: event.ids,
    //       data: event.data
    //     }
    //   });
    // });

  //   return () => this.socket.disconnect();
  // }

  // onLocationChange() {
  //   console.log('observer' );
  //   let observable = new Observable(observer => {
  //     console.log('io' );
  //     this.socket = io(this.apiURL);
  //     console.log(this.socket);
  //     this.socket.on('locationChange', (data) => {
  //       console.log('locationChange' );
  //       observer.next(data);    
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };  
  //   })     
  //   return observable;
  // }  

  // onLocationChange() {
  //   return Observable.create(observer => {
  //     this.socket.on('locationChange', location => {
  //       console.log('observer got a location: ' + location);
  //       observer.next(location);
  //     });
  //   });
  // }
}
 