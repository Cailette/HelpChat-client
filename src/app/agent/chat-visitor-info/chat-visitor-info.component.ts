import { Component, OnInit, Input} from '@angular/core';
import { VisitorService } from 'src/app/services/visitor.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-visitor-info',
  templateUrl: './chat-visitor-info.component.html'
})

export class ChatVisitorInfoComponent implements OnInit {
  isDataError: boolean;
  countedChats: number;
  geoLocation: string;
  lastVisit: string;
  _visitor: any;
  _location: any;
  
  @Input() isArchive: boolean = false;
  @Input() set location(value: any) { this._location = value.substring(1, value.length - 1); }
  @Input() set visitor(value: any) {
    this._visitor = value;
    if(value){
      this.lastVisit = moment(value.lastVisit).format('DD.MM.YYYY, HH:mm')
      this.getCountedChats();
      setTimeout(()=>{
        this.geoLocation = value.geoLocation.lat === 'Brak danych' 
          || value.geoLocation.lng === 'Brak danych' ? "" : JSON.stringify(value["geoLocation"]);
      }, 1000);
    }
  }
  
  constructor(
    private visitorService: VisitorService
  ) { }

  ngOnInit() {
    this.isDataError = false;
    this.geoLocation = "";
  }

  getCountedChats(){
    this.visitorService.getCountedChats(this._visitor._id, localStorage.getItem('agent-help-chat-token'))
      .subscribe(
        (data: any) => { this.countedChats = parseInt(data.countedChats) },
        (err: HttpErrorResponse) => { this.countedChats = 0 }
    );
  }
}
