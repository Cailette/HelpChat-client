import { Component, OnInit } from '@angular/core';
import { Visitor } from 'src/app/models/visitor.model';
import { VisitorService } from 'src/app/services/visitor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentSocketService } from 'src/app/services/agent-socket.service';
import { AgentService } from 'src/app/services/agent.service';
import * as moment from 'moment';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html'
})
export class VisitorsComponent implements OnInit {
  visitors: any = '';
  visitor: Visitor;
  countedChats: number;
  geoLocation: string;
  isDataError: boolean;

  constructor(private visitorService: VisitorService, private agentService: AgentService) { }

  async ngOnInit() {
    this.geoLocation = "";
    this.resetVisitor()
    this.getVisitors();
  }

  getVisitors(){
    console.log("data.visitors")
    this.visitorService.getVisitors(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.visitors = data.visitors;
      console.log(data.visitors)
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
      setTimeout(()=>{
        this.isDataError = false;
      }, 5000);
    });
  }

  viewVisitor(visitorId: string){
    this.resetVisitor();
    this.getCountedChats(visitorId);
    this.visitorService.getVisitor(visitorId, localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.visitor = {
        _id: data.visitor._id,
        geoLocation: {
          lat: data.visitor.geoLocation.lat,
          lng: data.visitor.geoLocation.lng
        },
        lastVisit: moment(data.visitor.lastVisit).format('DD.MM.YYYY, HH:mm'),
        browserSoftware: data.visitor.browserSoftware,
        operatingSoftware: data.visitor.operatingSoftware,
        representative: data.visitor.representative
      };
      this.geoLocation = this.visitor.geoLocation.lat === 'Brak danych' || this.visitor.geoLocation.lng === 'Brak danych' ? "" : JSON.stringify(this.visitor.geoLocation);
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
      setTimeout(()=>{
        this.isDataError = false;
      }, 5000);
    });
    
  }

  getCountedChats(visitorId: string){
    this.visitorService.getCountedChats(visitorId, localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.countedChats = parseInt(data.countedChats);
    },
    (err: HttpErrorResponse) => {
      this.countedChats = 0;
    });
  }

  resetVisitor() {
    this.visitor = {
      _id: "",
      geoLocation: {
        lat: "",
        lng: ""
      },
      lastVisit: "",
      browserSoftware: "",
      operatingSoftware: "",
      representative: "",
    };
    this.countedChats = 0;
    this.geoLocation = "";
  }
}
