import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FollowNotification} from '../../../pages/notification/notification.page';
import {FollowerService} from '../../../services/follower.service';

@Component({
  selector: 'app-follow-request',
  templateUrl: './follow-request.component.html',
  styleUrls: ['./follow-request.component.scss'],
})
export class FollowRequestComponent implements OnInit {
  @Input()followers: FollowNotification[];
  constructor(
    private modalCtrl: ModalController,
    private followerService: FollowerService
  ) {}

  ngOnInit() {}
  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
  public updateRequest(id: string, up = true) {
    this.followers.splice(this.followers.findIndex(f => f.id === id), 1);
    if(up) this.followerService.update({id, confirmed: true });
    else this.followerService.cancel(id);
  }
}
