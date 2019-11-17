import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Visitor } from '../models/visitor.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  readonly apiURL: string = environment.baseUrl;
 
  constructor(private http: HttpClient) { } 

  getVisitors(token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/visitors', {headers: reqHeader});
  }

  getVisitor(visitorId: string, token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/visitors/' + visitorId, {headers: reqHeader});
  }

  getCountedChats(visitorId: String, token: string){
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/visitors/countChats/' + visitorId, {headers: reqHeader});
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
 
  updateVisitor(token: string, status: boolean) {
    if(status){
      var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
      return this.http.put(this.apiURL + '/visitors/' + status, {}, {headers: reqHeader});
    } else {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("PUT", 'http://localhost:3000/visitors/' + status, false);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.setRequestHeader("x-access-token", token);
      xmlhttp.send();
    }
  }
}
