import { Component, OnInit, Inject } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
  isDataError: boolean;
  header: string;
  time: string;
  agent: string;

  statistics: any;
  isAgentsStatistics: boolean;

  constructor(private statisticsService: StatisticsService, @Inject('DAYS') public days: any[]) { }

  ngOnInit() {
    this.isAgentsStatistics = false;
    this.header = "";
    this.time = "";
    this.agent = "";
    this.isDataError = false;
  }

  onContentChange(statistics: any){
    let {selected, filterChatAgent, filterChatDate} = statistics;
    if(selected === this.header &&  filterChatAgent === this.agent && filterChatDate === this.time){
      return;
    }
    this.header = selected;
    this.time = filterChatDate;
    this.agent = filterChatAgent;
    filterChatDate = this.changeFilterDate(filterChatDate)

    if(selected === "workHours" || selected === "activity"){
      this.statisticsService.getAgentStatistics(localStorage.getItem('agent-help-chat-token'), selected, filterChatAgent, filterChatDate).subscribe((data: any) => {
        console.log("getAgentStatistics")
        if(selected === "activity"){
          let head = ["day", "from", "to", "timeDuration", "notLate"];
          let bars = [];
          let colName = ["Dzień", "Godzina od", "Godzina do", "Przedział czasu", "W czas"];
          console.log(data.statistics);
          data.statistics.forEach(s => {
            s.data.forEach(d => {
                let to = moment(d.to);
                let from = moment(d.from);
                let diff = to.diff(from);
                d.timeDuration = d.to ? moment.utc(diff).format("HH:mm:ss") : '-';
                d.day = moment.utc(d.from).format('DD.MM.YYYY');
                d.to = d.to ? moment.utc(d.to).format('HH:mm:ss') : '-';
                d.from = moment.utc(d.from).format('HH:mm:ss')
                d.notLate = d.inTime ? 'Tak' : 'Nie';
            });
          });

          let cells = data.statistics;
          this.statistics = {head: head, colName: colName, data: cells, bars: bars}
        }
        if(selected === "workHours"){
          let head = ["dayOfWeek", "hourFrom", "hourTo", "dayFrom", "dayTo"];
          let bars = [];
          let colName = ["Dzień tygodnia", "Godzina od", "Godzina do", "Obowiązywały od", "Obowiązywały do"];
          console.log(data.statistics);
          data.statistics.forEach(s => {
            s.data.forEach(d => {
                // let to = moment(d.to);
                // let from = moment(d.from);
                // let diff = to.diff(from);
                // d.timeDuration = d.to ? moment.utc(diff).format("HH:mm:ss") : '-';
                d.dayOfWeek = this.days.find(x => x.number === d.dayOfWeek).day;
                d.hourTo = d.hourTo + ':00';
                d.hourFrom = d.hourFrom + ':00';
                d.dayTo = d.dayTo ? moment.utc(d.dayTo).format('DD.MM.YYYY') : '-';
                d.dayFrom = moment.utc(d.dayFrom).format('DD.MM.YYYY')
            });
          });

          let cells = data.statistics;
          this.statistics = {head: head, colName: colName, data: cells, bars: bars}
          
        }

      },
      (err: HttpErrorResponse) => {
        this.isDataError = true;
      });
    } else {
      // this.isAgentsStatistics = false;
      this.statisticsService.getChatStatistics(localStorage.getItem('agent-help-chat-token'), selected, filterChatAgent, filterChatDate).subscribe((data: any) => {
        let head = data.statistics.map(s => s.time);
        let bars = data.statistics.map(s => s.data ? s.data : 0);
        let colName = null;
        let cells = [];
        cells[0] = [];
        data.statistics.forEach((s => cells[0][s.time] = s.data));
        this.statistics = {head: head, colName: colName, data: cells, bars: bars}
      },
      (err: HttpErrorResponse) => {
        this.isDataError = true;
      });
    }
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
