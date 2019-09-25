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

  //---------------------------------------------------------------------------------------------------------------
 
  getWorkingAgent(token: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/visitors/found-agent', {headers: reqHeader});
  }

  newVisitor(visitorData: Visitor) {
    const visitor = {
      geoLocation: { 
        lat: visitorData.geoLocation.lat, 
        lng: visitorData.geoLocation.lng,
      },
      browserSoftware: visitorData.browserSoftware,
      operatingSoftware: visitorData.operatingSoftware,
      representative: visitorData.representative
    }

    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiURL + '/visitors', visitor, {headers: reqHeader});
  }
 
  updateVisitor(token: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.put(this.apiURL + '/visitors', {}, {headers: reqHeader});
  }
}
 