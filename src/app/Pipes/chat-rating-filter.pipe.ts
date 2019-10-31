import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatRatingFilter'
})

export class ChatRatingFilter implements PipeTransform {
  transform(chats: any[], filter: string): any[] {
    if(!chats) return [];
    if(!filter || filter == "all") return chats;
    return chats.filter( chat => {
      return filter.toString() === chat["isActive"].toString();
    });
   }
}