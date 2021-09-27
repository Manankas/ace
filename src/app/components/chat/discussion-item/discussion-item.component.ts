import { Component, Input, OnInit } from '@angular/core';

import { Message } from '../../../models/chat/Message';

@Component({
  selector: 'app-discussion-item',
  templateUrl: './discussion-item.component.html',
  styleUrls: ['./discussion-item.component.scss'],
})
export class DiscussionItemComponent implements OnInit {
  @Input() message: Message;
  @Input() userId: string;
  @Input() receiverAvatar: string;
  @Input() userAvatar: string;
  @Input() senderName: string;

  constructor() {}

  ngOnInit() {}
}
