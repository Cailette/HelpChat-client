import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatRatingFilter'
})

export class ChatRatingFilter implements PipeTransform {
  transform(chats: any[], filter: string): any[] {
    if(!chats) return [];
    if(!filter || filter == "all") return chats;
    if(filter == "null") return chats.filter( chat => { 
        return null === chat["rating"];
    });
    return chats.filter( chat => {
      if(chat["rating"] === null || chat["rating"] === undefined) return false
      return filter.toString() === chat["rating"].toString();
    });
   }
}