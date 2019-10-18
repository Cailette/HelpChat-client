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
  isDataError: boolean;

  constructor(private visitorService: VisitorService, private agentService: AgentService) { }

  async ngOnInit() {
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
    this.visitorService.getVisitor(visitorId, localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.visitor = {
        geoLocation: {
          lat: data.visitor.geoLocation.lat,
          lng: data.visitor.geoLocation.lng
        },
        lastVisit: moment(data.visitor.lastVisit).format('DD.MM.YYYY, HH:mm'),
        browserSoftware: data.visitor.browserSoftware,
        operatingSoftware: data.visitor.operatingSoftware,
        representative: data.visitor.representative
      };
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
      setTimeout(()=>{
        this.isDataError = false;
      }, 5000);
    });
  }

  resetVisitor() {
    this.visitor = {
      geoLocation: {
        lat: "",
        lng: ""
      },
      lastVisit: "",
      browserSoftware: "",
      operatingSoftware: "",
      representative: "",
    };
  }
}
