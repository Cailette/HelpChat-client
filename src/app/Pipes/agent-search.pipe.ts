import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agentSearch'
})

export class AgentSearch implements PipeTransform {
  transform(agents: any[], searchText: string): any[] {
    if(!agents) return [];
    if(!searchText) return agents;

    searchText = searchText.toLowerCase();

    return agents.filter( agent => {
      return  agent["firstname"].toLowerCase().includes(searchText) ||
              agent["lastname"].toLowerCase().includes(searchText) ||
              (agent["firstname"].toLowerCase() + " " + agent["lastname"].toLowerCase()).includes(searchText) ||
              agent["email"].toLowerCase().includes(searchText);
    });
   }
}