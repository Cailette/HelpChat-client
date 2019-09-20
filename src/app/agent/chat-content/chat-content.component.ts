import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styles: []
})
export class ChatContentComponent implements OnInit {
  @Input() isArchive: boolean;

  constructor() { }

  ngOnInit() {
  }

}
