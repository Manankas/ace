import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Message } from '../../../models/chat/Message';
import { User } from '../../../models/User';
import { FollowerService } from '../../../services/follower.service';
import { IndexeddbService } from '../../../services/indexeddb.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
})
export class ChatFormComponent implements OnInit {
  @Input() recipient: User;
  @Input() followerId: string;
  public messages: Message[] = [];
  public user: {id: string; avatar: string} = {id: '', avatar: ''};
  public loading = false;

  constructor(
    private modalCtrl: ModalController,
    private messageService: MessageService,
    private followerService: FollowerService,
    private indexeddbService: IndexeddbService
  ) {}

  async ngOnInit() {
    const {id, avatar} = await this.indexeddbService.get('user');
    Object.assign(this.user, {id, avatar});
    this.messages = this.messageService.discussions(
      id,
      this.recipient.id
    );

    if(!this.followerId) {
      this.followerService.follower(this.recipient.id, id)
        .then(follower => { if(follower) this.followerId = follower.id;});
    }
  }

  public sendMessage(message: Message) {
    this.messageService.send(message)
    if (this.followerId) {
      this.followerService.update({
        id: this.followerId,
        lastConversation: message.createdAt,
      });
    }
  }
  async close() {
    await this.modalCtrl.dismiss({ dismissed: true, lastMsg: this.messages[0] });
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.loading = true;

      this.messageService
        .moreDiscussions(this.user.id, this.recipient.id, 15)
        .then((oldMessages) => {
          oldMessages.forEach((old) => {
            this.messages.push(old);
          });

          this.loading = false;
        });
    }
  }
}
