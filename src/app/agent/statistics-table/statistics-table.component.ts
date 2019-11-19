import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html'
})

export class StatisticsTableComponent implements OnInit {
  _heads: Array<String> = new Array<String>();
  @Input() set heads(value: Array<any>) {
    if (value !== undefined && value.length > 0) {
      this._heads = value;
    }
  }
  _datas:Array<any> = new Array<any>();
  @Input() set datas(value: Array<any>) {
    if (value !== undefined) {
      this._datas = value;
    }
  }

  _colName:Array<any> = new Array<any>();
  @Input() set colName(value: Array<any>) {
    if (value !== undefined) {
      this._colName = value;
    }
  }

  constructor() { }

  ngOnInit() {
  }
}