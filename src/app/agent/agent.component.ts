import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})

export class AgentComponent implements OnInit {
  isActive: boolean = false; // z bazy !!!

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

  SwitchActivity() {
    this.isActive = !this.isActive;
  }

}