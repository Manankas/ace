import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Message } from '../../../models/chat/Message';
import { IndexeddbService } from '../../../services/indexeddb.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  @Input() receiverId: string;
  @Input() messageType: 0|1 = 0;
  @Output() submit: EventEmitter<Message>;

  public messageInput = new Message();
  constructor(private indexeddbService: IndexeddbService) {
    this.submit = new EventEmitter<Message>();
  }

  async ngOnInit() {
    this.messageInput.convId = [(await this.indexeddbService.get('user')).id, this.receiverId];
    this.messageInput.type = this.messageType;
  }

  public send() {
    if (this.messageInput.content && this.messageInput.content !== '') {
      this.messageInput.createdAt = Date.now();
      this.submit.emit(this.messageInput);
      this.messageInput.content = '';
    }
  }
}
