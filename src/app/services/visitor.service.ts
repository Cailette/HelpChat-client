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

  
}
