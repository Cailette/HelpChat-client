import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { GlobalRole } from '../../auth/Role';


@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html'
})

export class ChatsListComponent implements OnInit {
  role: string;
  id: string;
  Agent: string;
  isDataError: boolean;
  isFilter: boolean;
  agents: Array<any>;
  filterChatDate: string = "all";
  filterChatAgent: string = "all";
  filterChatRating: string = "all";
  selected: string;
  counted: number;
  _chats: any = [];

  @Output() switchRoomClick = new EventEmitter<string>();
  @Input() isArchive: boolean = false;
  @Input() set chats(value: any) {
    if(value){
      for (var i = 0; i < value.length; i++) {
        if(!value[i].time)
        value[i].time = moment(new Date(value[i].date))
          .format(this.isArchive ? 'DD.MM.YYYY' : 'HH:mm');
      };
      this.count(value);
      this._chats = value;
    }
  }

  constructor(
    private globalRole: GlobalRole
  ) {
    this.role = this.globalRole.role;
    this.Agent = this.globalRole.Agent;
    this.id = this.globalRole.id;
  }

  ngOnInit() {
    if(this._chats === undefined) this.isDataError = true;
    if(this.role === this.Agent) this.filterChatAgent = this.id;
    this.isDataError = false;
    this.isFilter = false;
    this.selected = "";
    this.agents = [];
    this.counted = 0;
  }

  onChange(option, filter) {
    if(filter == "filterChatDate") this.filterChatDate = option
    if(filter == "filterChatAgent") this.filterChatAgent = option
    if(filter == "filterChatRating") this.filterChatRating = option
  }

  switchRoom(chatId: string){
    this.switchRoomClick.emit(chatId);
    this.selected = chatId;
  }

  showFilter() {
    const agentsFormChat = [... this._chats.map(data => data.agent)]
    this.agents = agentsFormChat.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj["_id"]).indexOf(obj["_id"]) === pos;
      });
    this.isFilter = !this.isFilter;
  }

  count(value: Array<any>){
    this.counted = value.length;
  }
}
