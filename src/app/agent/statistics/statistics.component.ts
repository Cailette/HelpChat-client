import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
  isDataError: boolean;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.isDataError = false;
  }

  onContentChange(statistics: any){
    let {selected, filterChatAgent, filterChatDate} = statistics;
    this.statisticsService.getStatistics(localStorage.getItem('agent-help-chat-token'), selected, filterChatAgent, filterChatDate).subscribe((data: any) => {
      // this.chats = data.chats;  
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }
}
