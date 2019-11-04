import { Component, OnInit } from '@angular/core';
import { Visitor } from 'src/app/models/visitor.model';
import { VisitorService } from 'src/app/services/visitor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentService } from 'src/app/services/agent.service';
import * as moment from 'moment';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html'
})
export class VisitorsComponent implements OnInit {
  visitors: any = '';
  visitor: any;
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
      let value = data.visitors;
      for (var i = 0; i < value.length; i++) {
        value[i].time = moment(new Date(value[i].lastVisit)).format('DD.MM.YYYY, HH:mm');
        value[i].countChats = value.chats ? value.chats.length : 0;
      };
      this.visitors = value;
      console.log(this.visitors)
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
    this.visitor = this.visitors.find(visitor => {
      return visitor._id === visitorId
    })
    this.geoLocation = this.visitor.geoLocation.lat === 'Brak danych' || this.visitor.geoLocation.lng === 'Brak danych' ? "" : JSON.stringify(this.visitor.geoLocation);
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
