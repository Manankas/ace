import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {User} from '../../../models/User';
import {FollowerService} from '../../../services/follower.service';
import {IndexeddbService} from '../../../services/indexeddb.service';
import {Follower} from '../../../models/Follower';
import {ChatFormComponent} from '../../chat/chat-form/chat-form.component';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class FollowComponent implements OnInit {
  @Input()user: User;
  public curUserId: string;
  public countFollowers = 0;
  public isCurUserFollower: Follower;
  public requestButton = 'follow';
  constructor(
    private modalCtrl: ModalController,
    private followerService: FollowerService,
    private indexDbService: IndexeddbService
  ) {}

  ngOnInit() {
    this.indexDbService.get('user').then(user => {
      this.curUserId = user.id;
      this.followerService.followers(this.user.id)
        .then(followers => {
          followers.forEach(follower => {
            if(follower.partners[1] === this.curUserId) this.isCurUserFollower = follower;
            if(follower.partners[0] === this.user.id)this.countFollowers++;
          })
          if(this.isCurUserFollower)
            this.requestButton = this.isCurUserFollower.confirmed ? undefined : 'waiting';
        });
    });
  }

  public async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
  public follow() {
    switch (this.requestButton) {
      case 'follow':
        const { id, ...res} = new Follower();
        res.partners = [this.user.id, this.curUserId];
        this.followerService.add(res).then(f => {
          this.isCurUserFollower = f;
          this.countFollowers += 1;
          this.requestButton = 'waiting';
        })
        break;
      case 'waiting':
        this.unfollow();
        break;
    }
  }
 public unfollow() {
   this.followerService.cancel(this.isCurUserFollower.id)
     .then(() => {
       this.isCurUserFollower = undefined;
       this.requestButton = 'follow';
     });
 };
  public async openChatModal() {
    const modal = await this.modalCtrl.create({
      component: ChatFormComponent,
      componentProps: { recipient: this.user, followerId: this.isCurUserFollower.id},
    });
    await modal.present();
  }
}
