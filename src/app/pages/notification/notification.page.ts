import { Component, OnInit } from '@angular/core';

// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';

import { CollaborationRequestComponent } from '../../components/notification/collaboration-request/collaboration-request.component';
import { FollowRequestComponent } from '../../components/notification/follow-request/follow-request.component';
import { FollowerService } from '../../services/follower.service';
import { IndexeddbService } from '../../services/indexeddb.service';
import { MemberService, UserCollaborator } from '../../services/member.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { toDate } from '../../utils/date';

export type FollowNotification = {
  name: string;
  userId?: string;
  avatar: any;
  date: string;
  id: string;
};
export type MemberNotification = FollowNotification & { title: string };

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  public newRequests: UserCollaborator[] = [];
  public followers: Array<FollowNotification> = [];
  public members: MemberNotification[] = [];
  constructor(
    private projectService: ProjectService,
    private indexedDbService: IndexeddbService,
    private memberService: MemberService,
    private userService: UserService,
    private followerService: FollowerService,
    private modalCtrl: ModalController
  )
  {}

  async ngOnInit() {
    const userId = (await this.indexedDbService.get('user'))?.id;
    this.projectService.findByUserId(userId, false).then((projects) => {
      this.memberService
        .findNewRequests(projects.map((p) => p.id))
        .then((members) => {
          this.members = members.map((member) => {
            return {
              name: member.user.prenom + ' ' + member.user.nom,
              avatar: member.user.avatar,
              date: toDate(member.member.createdAt),
              title: projects.find(
                (p) => p.id === member.member.collaborationId
              ).name,
              id: member.member.id,
            };
          });
        });
    });

    /**followers**/
    this.followerService.unconfirmedRequests(userId).then(async (followers) => {
      const users = await this.userService.findUserByIds(
        followers.map((f) => f.partners[1].toString())
      );
      this.followers = followers.map((follower) => {
        const user = users.find((u) => u.id === follower.partners[1].toString());
        return {
          name: user.prenom + ' ' + user.nom,
          date: toDate(follower.createdAt),
          avatar: user.avatar,
          id: follower.id,
        };
      });
    });
  }

  async openFollowRequest() {
    const modal = await this.modalCtrl.create({
      component: FollowRequestComponent,
      componentProps: { followers: this.followers },
      cssClass: 'modal-fullscreen',
    });

    await modal.present();
  }

  async openCollaborationRequest() {
    const modal = await this.modalCtrl.create({
      component: CollaborationRequestComponent,
      componentProps: { members: this.members },
      cssClass: 'modal-fullscreen',
    });

    await modal.present();
  }

}
