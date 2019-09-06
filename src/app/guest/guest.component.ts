import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('agent-help-chat-token') != null)
      this.router.navigate(['/home']);
  }
}
