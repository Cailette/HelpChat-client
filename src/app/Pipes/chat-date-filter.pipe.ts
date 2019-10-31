import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatDateFilter'
})

export class ChatDateFilter implements PipeTransform {
  transform(chats: any[], filter: string): any[] {
    if(!chats) return [];
    if(!filter || filter == "all") return chats;
    return chats.filter( chat => {
      return filter.toString() === chat["isActive"].toString();
    });
   }
}