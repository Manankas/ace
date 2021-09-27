import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { IndexeddbService } from 'src/app/services/indexeddb.service';
import { UserCollaborator } from 'src/app/services/member.service';

import { Message } from '../../../../models/chat/Message';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-collaboration-chat',
  templateUrl: './collaboration-chat.component.html',
  styleUrls: ['./collaboration-chat.component.scss'],
})
export class CollaborationChatComponent implements OnInit {
  @Input() receiverId: string;
  @Input() collaborators: UserCollaborator[];

  public messages: Message[];
  public loading = false;
  public userId;

  constructor(
    private messageService: MessageService,
    public el: ElementRef,
    private indexDbService: IndexeddbService
  ) {}

  async ngOnInit() {
    this.messages = this.messageService.groupDiscussions(this.receiverId, 15);
    this.userId = (await this.indexDbService.get('user')).id;
  }

  getSenderName(id: string) {
    const collaborator = this.collaborators.find((collab) => collab.user.id === id);
    return collaborator ? collaborator.user.nom.split(' ')[0] : '';
  }

  public async sendMessage(message: Message) {
    await this.messageService.send(message);
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.loading = true;

      this.messageService
        .moreGroupDiscussions(this.receiverId, 15)
        .then((oldMessages) => {
          oldMessages.forEach((old) => {
            this.messages.push(old);
          });

          this.loading = false;
        });
    }
  }
}
