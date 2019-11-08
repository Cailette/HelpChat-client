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
    filterChatDate = this.changeFilterDate(filterChatDate)
    this.statisticsService.getStatistics(localStorage.getItem('agent-help-chat-token'), selected, filterChatAgent, filterChatDate).subscribe((data: any) => {
      // this.chats = data.chats;  
    },
    (err: HttpErrorResponse) => {
      this.isDataError = true;
    });
  }

  changeFilterDate(filterChatDate){
    switch (filterChatDate) {
      case 'today':
        var date = new Date();
        var today = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        console.log(today)
        console.log(JSON.stringify(today))
        return JSON.stringify(today)
      case 'yesterday':
        var date = new Date();
        var today = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        date.setDate(date.getDate() - 1);
        var yesterday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return JSON.stringify({from: yesterday, to: today})
      case '7days':
        var date = new Date();
        date.setDate(date.getDate() - 7);
        var days7 = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return JSON.stringify(days7)
      case '30days':
        var date = new Date();
        date.setDate(date.getDate() - 30);
        var days30 = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return JSON.stringify(days30)
      case 'lastMonth':
        var date = new Date()
        date.setMonth(date.getMonth() - 1);
        var y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(Date.UTC(y, m, 1));
        var lastDay = new Date(Date.UTC(y, m + 1, 0));
        return JSON.stringify({from: firstDay, to: lastDay})
      case 'currentMonth':
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(Date.UTC(y, m, 1));
        var lastDay = new Date(Date.UTC(y, m + 1, 0));
        return JSON.stringify({from: firstDay, to: lastDay})
      default:
        return filterChatDate
    }
  }
}
