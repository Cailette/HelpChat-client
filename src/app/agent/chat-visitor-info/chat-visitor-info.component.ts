import { Component, OnInit, Input} from '@angular/core';
import { Visitor } from 'src/app/models/visitor.model';
import { VisitorService } from 'src/app/services/visitor.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-visitor-info',
  templateUrl: './chat-visitor-info.component.html'
})

export class ChatVisitorInfoComponent implements OnInit {
  _visitorId: string;
  @Input() set visitorId(value: string) {
    this._visitorId = value;
    if(value){
    this.getVisitor();
    this.getCountedChats();
    }
  }
  visitor: Visitor;
  countedChats: number;
  isDataError: boolean;

  constructor(private visitorService: VisitorService) { }

  ngOnInit() {
    this.resetVisitor()
    this.isDataError = false;
  }

  getVisitor(){
    this.visitorService.getVisitor(this._visitorId, localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      console.log(JSON.stringify(data.visitor));
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

  getCountedChats(){
    this.visitorService.getCountedChats(this._visitorId, localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      console.log("data.countedChats " + data.countedChats)
      this.countedChats = parseInt(data.countedChats);
    },
    (err: HttpErrorResponse) => {
      this.countedChats = 0;
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
