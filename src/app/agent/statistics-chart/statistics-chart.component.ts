import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistics-chart',
  templateUrl: './statistics-chart.component.html',
  styles: []
})

export class StatisticsChartComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
      xAxes: [{}], 
      yAxes: [{ 
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          suggestedMax: 10
        } 
      }] 
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  barChartLabels: Label[];
  barChartData: ChartDataSets[];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [pluginDataLabels];

  @Input() set labels(value: any) {
    if(value !== undefined) this.barChartLabels = value;
  }

  @Input() set bars(value: any) {
    if(value !== undefined){
      this.barChartData = [{
          data: value,
          backgroundColor: '#1565c063'
      }];
    }
  }

  constructor() { }

  ngOnInit() {
    this.barChartLabels = [];
    this.barChartData = [
      { data: [] }
    ];
  }
}