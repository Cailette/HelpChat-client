import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html'
})

export class StatisticsTableComponent implements OnInit {
  private isColName: Boolean = false;
  _heads: Array<String> = new Array<String>();
  @Input() set heads(value: Array<any>) {
    if (value !== undefined && value.length > 0) {
      this._heads = value;
    }
  }
  _datas:Array<any> = new Array<any>();
  @Input() set datas(value: Array<any>) {
    if (!this.isColName) {
      if (value !== undefined && value.length > 0) {
        this._datas = value;
      }
    }
  }
  _colName: Array<String> = new Array<String>();
  @Input() set colName(value: Array<any>) {
    if (value !== undefined && value.length > 0) {
      this._colName = value;
      this.isColName = true;
      if (!this.isHeadAndColLengthSame(this._heads, this._colName)) {
        console.error('ERROR: Table columns names and heads different length');
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

  private isHeadAndColLengthSame(head: Array<String>, col: Array<String>): Boolean {
    return (head.length === col.length);
  }
}