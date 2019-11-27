import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chat-rate',
  templateUrl: './chat-rate.component.html',
  styles: []
})
export class ChatRateComponent implements OnInit {
  chatId: string;
  rating: boolean;

  constructor(
    private router: ActivatedRoute, 
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.rating = true;
    this.router.params
      .subscribe(params => { this.chatId = params['chatId']; });
  }

  rate(rating: number){
    console.log(rating)
    this.chatService.rateChat(
      localStorage.getItem('visitor-help-chat-token'), this.chatId, rating)
      .subscribe(
        (data: any) => { this.rating = false; },
        (err: HttpErrorResponse) => { console.log(JSON.stringify(err)); }
      );
  }
}
