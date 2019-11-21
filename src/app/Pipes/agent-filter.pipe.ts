import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agentFilter'
})

export class AgentFilter implements PipeTransform {
  transform(agents: any[], filter: string): any[] {
    if(!agents) return [];
    if(!filter || filter == "all") return agents;
    return agents.filter( agent => {
      return filter.toString() === agent["isActive"].toString();
    });
   }
}