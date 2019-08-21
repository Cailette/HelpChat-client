import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { WorkDay } from '../models/workDay';

@Injectable({
  providedIn: 'root'
})
export class WorkHoursService {
  readonly apiURL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createAgentWorkHours(token: string, wrokHours: any, agentId: string){
    const wrokHoursBody: WorkDay = {
      hourFrom: Number(wrokHours.hourFrom),
      hourTo: Number(wrokHours.hourTo),
      dayOfWeek: Number(wrokHours.dayOfWeek)
    }
    console.log("wrokHoursBody " + JSON.stringify(wrokHoursBody))
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.post(this.apiURL + '/work-hours/create-work-hours/' + agentId, wrokHoursBody, {headers: reqHeader});
  }

  getAgentWorkHours(token: string, agentId: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/work-hours/get-work-hours/' + agentId, {headers: reqHeader});
  }
  
  deleteWorkHours(token: string, workHoursId: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.put(this.apiURL + '/work-hours/delete-work-hours/' + workHoursId, {}, {headers: reqHeader});
  }
  
  createWorkHours(token: string, wrokHours: any){
    const wrokHoursBody: WorkDay = {
      hourFrom: Number(wrokHours.hourFrom),
      hourTo: Number(wrokHours.hourTo),
      dayOfWeek: Number(wrokHours.dayOfWeek)
    }
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.post(this.apiURL + '/work-hours/create-work-hours', wrokHoursBody, {headers: reqHeader});
  }

  getWorkHours(token: string) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json'}).set('x-access-token', token);
    return this.http.get(this.apiURL + '/work-hours/get-work-hours', {headers: reqHeader});
  }
}
