import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html'
})
export class ChatContentComponent implements OnInit {
  message: string;
  _messages: any;
  _agent: any;
  _isChat: boolean;
  _visitorDisconnect: boolean;

  @Input() isArchive: boolean;
  @Input() set messages(value: any) {
    if(value){
      for (var i = 0; i < value.length; i++) {
        value[i].time = moment(new Date(value[i].date)).format('HH:mm');
      };
      this._messages = value;
    }
  }
  @Input() set agent(value: any) {
    this._agent = "";
    if(value) this._agent = value.firstname + " " + value.lastname;
  }
  @Input() set isChat(value: boolean) { this._isChat = value; }
  @Input() set visitorDisconnect(value: boolean) { this._visitorDisconnect = value; }
  @Output() sendMessage = new EventEmitter<string>();
  @Output() closeThisChat = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this._visitorDisconnect = false;
    this.message = "";
  }

  sendMessageClick(){
    if(this.message !== "") this.sendMessage.emit(this.message);
    this.message = "";
  }

  closeChat(){
    this.closeThisChat.emit();
  }
}