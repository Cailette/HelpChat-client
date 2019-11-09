import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @Output() sendMessage = new EventEmitter<string>();
  message: string;
  

  constructor() { }

  ngOnInit() {
    this.message = "";
  }

  sendMessageClick(){
    if(this.message !== "") {
      this.sendMessage.emit(this.message);
    }
    this.message = "";
  }
}