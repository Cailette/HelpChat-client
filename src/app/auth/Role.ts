import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class GlobalRole {
  role: string = '';
  id: string = '';
  Agent: string = 'Agent';
  Representative: string = 'Representative';
}

@Injectable()
export class Role {
  constructor(private jwtHelperService: JwtHelperService, private globalRole: GlobalRole) {}

  isAuthorized(): string {
   const token = localStorage.getItem('agent-help-chat-token');
    const decodeToken = this.jwtHelperService.decodeToken(token);
    if (!decodeToken) {
      console.log('Invalid token');
      return;
    }
  
    this.globalRole.role = decodeToken['representative'] ? "Agent" : "Representative";
    this.globalRole.id =  decodeToken['id'];
  }
}