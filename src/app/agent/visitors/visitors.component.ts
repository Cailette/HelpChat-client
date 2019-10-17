import { Component, OnInit } from '@angular/core';
import { Visitor } from 'src/app/models/visitor.model';
import { VisitorService } from 'src/app/services/visitor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentSocketService } from 'src/app/services/agent-socket.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html'
})
export class VisitorsComponent implements OnInit {
  visitors: any = '';
  visitor: Visitor;

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
      // !!!
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
        lastVisit: data.visitor.lastVisit,
        browserSoftware: data.visitor.browserSoftware,
        operatingSoftware: data.visitor.operatingSoftware,
        representative: data.visitor.representative
      };
    },
    (err: HttpErrorResponse) => {
      // !!!
    });
  }

  resetVisitor() {
    this.visitor = {
      geoLocation: {
        lat: "",
        lng: ""
      },
      lastVisit: new Date,
      browserSoftware: "",
      operatingSoftware: "",
      representative: "",
    };
  }
}
