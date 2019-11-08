import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html'
})
export class StatisticsListComponent implements OnInit {
  @Output() contentChange = new EventEmitter<{selected: string, filterChatAgent: string, filterChatDate: string}>();

  filterChatDate: string = "today";
  filterChatAgent: string = "all";

  isFilter: boolean = false;
  isDataError: boolean;
  agents: any;
  selected: any;

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
    this.changeContent()
  }

  changeStatistics(select: string){
    this.selected = select;
    this.changeContent()
  }
  
  changeContent() {
    this.contentChange.emit({selected: this.selected, filterChatAgent: this.filterChatAgent, filterChatDate: this.filterChatDate});
    
    // if(this.selected == "total") {
    //   this.filterChatDate = "7days";
    //   this.filterChatAgent = "all";
    //   this.contentChange.emit({selected: this.selected, filterChatAgent: this.filterChatAgent, filterChatDate: this.filterChatDate});
    // } else {
    //   }
  }
}
