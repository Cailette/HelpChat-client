import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html'
})
export class StatisticsListComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();
  @Output() contentChange = new EventEmitter<any>();
  filterChatDate: string = "all";
  filterChatAgent: string = "all";
  isFilter: boolean = false;
  isDataError: boolean;
  agents: any;

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.getAgents();
    this.isDataError = false;
  }

  showFilter() {
    this.isFilter = !this.isFilter;
  }

  getAgents(){
    this.agentService.getAgents(localStorage.getItem('agent-help-chat-token')).subscribe((data: any) => {
      this.agents = data.users;
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  onChange(option, filter) {
    if(filter == "filterChatDate"){
      this.filterChatDate = option
    }
    if(filter == "filterChatAgent"){
      this.filterChatAgent = option
    }
  }
}
