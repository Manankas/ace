import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {FollowerService} from '../../../services/follower.service';
import {QueryDocumentSnapshot} from '@angular/fire/firestore';
import {Follower} from '../../../models/Follower';
import {SearchUsersComponent} from '../../chat/search-users/search-users.component';
import {FollowComponent} from '../follow/follow.component';
import {FollowRequestComponent} from '../../notification/follow-request/follow-request.component';
import {FollowNotification} from '../../../pages/notification/notification.page';
import {toDate} from '../../../utils/date';

type Follow  = {followers: User[]; following: User[];};
type FollowRequest = {users: User[], requests: FollowNotification[] };
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
})
export class FollowersComponent implements OnInit {
  @Input()user: User;
  public F: Follow = {followers: [], following: []}
  public followRequest: FollowRequest = {users: [], requests: []};
  private limit = 15;
  private lastCreationDate: number;
  public loading = true;
  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private followerService: FollowerService
  ) { }

  ngOnInit() {
    this.followerService.findMyFirst(this.user.id, this.limit)
      .then(docs => this.setF(docs))
      .catch((e) => console.log(e))
      .finally(() => this.loading = false);
  }
  async close() {
    await this.modalCtrl.dismiss()
  }
  private async setF(docs: QueryDocumentSnapshot<Follower>[]) {
    const size = docs.length;
    if(size > 0) {
      this.lastCreationDate = docs[size - 1].data().createdAt;
      const ids = new Set<string>();
      docs.forEach(f => {
        ids.add(f.data().partners[0]);
        ids.add(f.data().partners[1]);
      });
      ids.delete(this.user.id);
      const users =  await this.userService.findUserByIds(Array.from(ids));
      docs.forEach(doc => {
        const f = doc.data();
        const pId = f.partners.indexOf(this.user.id);
        if(f.confirmed) {
          if(pId === 0)this.F.followers.push(users.find(u => u.id === f.partners[1]));/**who follow me*/
          else this.F.following.push(users.find(u => u.id === f.partners[0]));/*Who I follow**/
        }
        else if(!f.confirmed && pId === 0) {
          const user  = users.find(u => u.id === f.partners[1]);
          this.followRequest.users.push(user);
          this.followRequest.requests.push({
            name: user.nom + ' ' + user.prenom,
            userId: user.id,
            avatar: user.avatar,
            date: toDate(f.createdAt),
            id: doc.id
          })
        }
      })
    }
  }

  public findMoreF(event: any) {
    if(this.F.followers.length + this.F.following.length >= this.limit) {
      this.followerService.findMyNext(this.user.id, this.limit, this.lastCreationDate)
        .then(docs => this.setF(docs))
        .finally(() => event.target.complete());
    } else event.target.complete();
  }

  public searchUserModal() {
    this.modalCtrl.create({
      component: SearchUsersComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { userId: this.user.id }
    }).then(modal => modal.present());
  }
  public openFollowModal(user: User) {
    this.modalCtrl.create({
      component: FollowComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { user }
    }).then(modal => modal.present());
  }
  public async followRequestModal() {
    const modal = await this.modalCtrl.create({
      component: FollowRequestComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {followers: this.followRequest.requests}
    })
    modal.onWillDismiss().then(() => {
      this.followRequest.users.forEach((user, ind) => {
        const index = this.followRequest.requests.findIndex(r => r.userId === user.id);
        if(index < 0) {
          this.F.followers.unshift(user);
          this.followRequest.users.splice(ind, 1);
        }
      })
    })
    await modal.present();
  }
}
