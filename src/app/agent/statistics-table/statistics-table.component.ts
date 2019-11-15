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
      if (value !== undefined) {
        this._datas = value;
      }
    }
  }
  _rowName: Array<String> = new Array<String>();
  @Input() set rowName(value: Array<any>) {
    if (value !== undefined && value.length > 0) {
      this._rowName = value;
      this.isColName = true;
      if (!this.isHeadAndColLengthSame(this._heads, this._rowName)) {
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