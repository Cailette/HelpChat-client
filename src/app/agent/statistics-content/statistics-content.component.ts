import { Component, OnInit, Input } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-statistics-content',
  templateUrl: './statistics-content.component.html'
})
export class StatisticsContentComponent implements OnInit {
  isDataError: boolean;
  data: Array<any>;
  head: Array<String>;
  bars: Array<String>;
  colName: Array<String>;
  agentsStatistics: Array<any>;
  isAgentsStatistics: boolean;
  
  _header: string;
  @Input() set header(value: string) {
    this.headerChange(value);
  }
  _time: string;
  @Input() set time(value: string) {
    this.timeChange(value);
  }
  _agent: string;
  @Input() set agent(value: string) {
    this.agentChange(value);
  }

  @Input() set statistics(value: any) {
    if(value !== undefined && value.data !== undefined && value.head !== undefined && value.bars !== undefined){
      this.data = value.data;
      this.head = value.head;
      this.bars = value.bars;
      this.colName = value.colName;
    }
    if(this.isAgentsStatistics) {
      this.head = value.head;
      this.colName = value.colName;
      this.agentsStatistics = value.data;
      console.log(this.agentsStatistics)
    }
  }

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.agentsStatistics = [];
    this.isDataError = false;
  }
  
  headerChange(selected){
    this.isAgentsStatistics = false;
    switch (selected) {
      case "all":
        this._header = "Suma chatów";
        break;
      case "satisfaction":
          this._header = "Średnia satysfakcja odwiedzających";
          break;
      case "availability":
          this._header = "Czas dostępności czatu";
          break;
      case "chatTime":
          this._header = "Średni czas rozmów";
          break;
      case "activity":
          this.isAgentsStatistics = true;
          this._header = "Aktywność konsultantów";
          break;
      case "workHours":
          this.isAgentsStatistics = true;
          this._header = "Czas pracy konsultantów";
          break; 
      default:
          this._header = "";
    }
  }

  timeChange(selected){
    switch (selected) {
      case "today":
        this._time = "Dzisiaj";
        break;
      case "yesterday":
          this._time = "Wczoraj";
          break;
      case "7days":
          this._time = "Ostatnich 7 dni";
          break;
      case "30days":
          this._time = "Ostatnich 30 dni";
          break;
      case "lastMonth":
          this._time = "Poprzedni miesiąc";
          break;
      case "currentMonth":
          this._time = "Bieżący miesiąc";
          break; 
      case "all":
          this._time = "Wszystkie";
          break; 
      default:
          this._time = "";
    }
  }

  agentChange(selected){
    switch (selected) {
      case "all":
        this._agent = "wszystkich agentów";
        break; 
      default:
        this.agentService.getAgentInformation(localStorage.getItem('agent-help-chat-token'), selected).subscribe((data: any) => {
          this._agent = data.user.firstname + " " + data.user.lastname;
        },
        (err: HttpErrorResponse) => {
          this.isDataError = true;
        });
    }
  }
}