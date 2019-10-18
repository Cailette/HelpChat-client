import { Component, OnInit, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html'
})
export class ChatContentComponent implements OnInit {
  @Input() isArchive: boolean;
  @Input() chat: any;

  constructor() { }

  ngOnInit() {
  }

}
