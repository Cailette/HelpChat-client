import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html'
})
export class ChatContentComponent implements OnInit {
  @Input() isArchive: boolean;
  _messages: any;
  @Input() set messages(value: any) {
    if(value){
      for (var i = 0; i < value.length; i++) {
        value[i].time = moment(new Date(value[i].date)).format('HH:mm');
      };
      this._messages = value;
      console.log(this._messages)
    }
  }
  _agent: any;
  @Input() set agent(value: any) {
    this._agent = "";
    if(value){
      this._agent = value.firstname + " " + value.lastname;
    }
  }

  constructor() { }

  ngOnInit() {
  }
}