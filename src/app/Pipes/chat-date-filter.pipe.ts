import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatDateFilter'
})

export class ChatDateFilter implements PipeTransform {
  transform(chats: any[], filter: string): any[] {
    if(!chats) return [];
    if(!filter || filter == "all") return chats;
    if(filter == "today") return this.today(chats);
    if(filter == "yesterday") return this.yesterday(chats);
    if(filter == "7days") return this.days7(chats);
    if(filter == "30days") return this.days30(chats);
    if(filter == "lastMonth") return this.lastMonth(chats);
    if(filter == "currentMonth") return this.currentMonth(chats);
   }

   today(chats: any[]){
    var today = moment(new Date()).format('DDMMYYYY');
    return chats.filter( chat => {
      return today === moment(chat["date"]).format('DDMMYYYY');
    });
   }

   yesterday(chats: any[]){
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var yesterday = moment(date).format('DDMMYYYY');
    return chats.filter( chat => {
      return yesterday === moment(chat["date"]).format('DDMMYYYY');
    });
   }

   days7(chats: any[]){
    var days7 = new Date();
    days7.setDate(days7.getDate() - 7);
    return chats.filter( chat => {
      return days7 <= new Date(chat["date"]);
    });
   }

   days30(chats: any[]){
    var days30 = new Date();
    days30.setDate(days30.getDate() - 30);
    return chats.filter( chat => {
      return days30 <= new Date(chat["date"]);
    });
   }

   lastMonth(chats: any[]){
    var date = new Date();
    date.setDate(0);
    var lastMonth = moment(date).format('MM');
    return chats.filter( chat => {
      return lastMonth === moment(chat["date"]).format('MM');
    });
   }

   currentMonth(chats: any[]){
    var currentMonth = moment(new Date()).format('MM');
    return chats.filter( chat => {
      return currentMonth === moment(chat["date"]).format('MM');
    });
   }
}