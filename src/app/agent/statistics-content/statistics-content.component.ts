import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-content',
  templateUrl: './statistics-content.component.html'
})
export class StatisticsContentComponent implements OnInit {
  data: Array<any>;
  head: Array<String>;
  colName: Array<String>;

  constructor(){
    this.head = new Array<String>('Name', 'Age', 'Gender');
    this.colName = new Array<String>('name', 'age', 'gender');
    this.data = new Array<UserDetails>();
  }

  ngOnInit() {
    this.data.push(new UserDetails('Apple', 18, 'Male'));
    this.data.push(new UserDetails2('Banana', 24));
    this.data.push(new UserDetails2('Mango', 34));
    this.data.push(new UserDetails('Orange', 13, 'Female'));
    this.data.push(new UserDetails('Guava', 56, 'Male'));
  }
}

export class UserDetails{
  constructor(public name: String, public age: Number, public gender: String) { }
}

export class UserDetails2{
  constructor(public name: String, public age: Number) { }
}