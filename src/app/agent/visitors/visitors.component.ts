import { Component, OnInit } from '@angular/core';
import { Visitor } from 'src/app/models/visitor.model';
import { VisitorService } from 'src/app/services/visitor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html'
})
export class VisitorsComponent implements OnInit {
  visitors: any = '';
  visitor: Visitor;
  connection;

  constructor(private visitorService: VisitorService, private chatService: ChatService, private agentService: AgentService) {
    this.chatService.onLocationChange().subscribe(data => {
      console.log(JSON.stringify(data))
    });
  }

  async ngOnInit() {
    this.resetVisitor()
    this.getVisitors();

    this.agentService.getAccountInformation(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {      
      this.chatService.joinRoom(data.user._id);
    },
    (err: HttpErrorResponse) => {
      // !!!
    });
  }

  getVisitors(){
    this.visitorService.getVisitors(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.visitors = data.visitors;
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
        operatingSoftware: data.visitor.operatingSoftware
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
      operatingSoftware: ""
    };
  }



  // ngOnDestroy() {
  //   this.connection.unsubscribe();
  // }

}
