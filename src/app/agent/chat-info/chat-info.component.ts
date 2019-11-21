import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { GlobalRole } from '../../auth/Role';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styles: []
})
export class ChatInfoComponent implements OnInit {
  role: string;
  Representative: string;
  isDataError: boolean;
  deleteChat: string;
  date: string;
  _chat: any;
  _agent: any;
  
  @Input() set agent(value: any) {
    this._agent = "";
    if(value) this._agent = value.firstname + " " + value.lastname;
  }
  @Input() set chat(value: any) {
    this._chat = value;
    this.date = moment(value.date).format('DD.MM.YYYY, HH:mm')
  }
  @Output() clickDeleteChat = new EventEmitter<string>();

  constructor(
    private globalRole: GlobalRole, 
    private chatService: ChatService
  ) {
    this.role = this.globalRole.role;
    this.Representative = this.globalRole.Representative;
  }

  ngOnInit() {
    this.isDataError = false;
  }

  modalDelete(chatId: string){
    this.deleteChat = chatId;
  }

  delete(){
    this.chatService.delete(localStorage.getItem('agent-help-chat-token'), this.deleteChat)
    .subscribe(
      (data: any) => { this.clickDeleteChat.emit() },
      (err: HttpErrorResponse) => { this.isDataError = true }
    );
  }
}
