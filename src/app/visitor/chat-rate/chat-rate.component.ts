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

  constructor(private router: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit() {
    this.rating = true;
    this.router.params.subscribe(params => {
      this.chatId = params['chatId'];
      console.log(this.chatId);
    });
  }

  rate(rating: number){
    this.chatService.rateChat(localStorage.getItem('visitor-help-chat-token'), this.chatId, rating).subscribe((data: any) => {
      console.log(JSON.stringify(data.message));
    },
    (err: HttpErrorResponse) => {
      console.log(JSON.stringify(err));
    });
    console.log(rating)
    this.rating = false;
  }
}
