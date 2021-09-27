import {Component, Input} from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {ModalController} from '@ionic/angular';
import {FollowComponent} from '../../follower/follow/follow.component';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
})
export class SearchUsersComponent {
  @Input()userId: string;
  public foundedUsers: User[];
  public pseudo = '';
  public loading = false;
  constructor(
    private userService: UserService,
    public modalCtrl: ModalController,
  ) { }

  async close() { await this.modalCtrl.dismiss();}
  async findUsers() {
    this.loading = true;
   this.userService.findUsers(this.pseudo)
     .then(users => this.foundedUsers = users)
     .catch(e => console.log(e))
     .finally(() => this.loading = false);
  }

  public async openFollowModal(index: number) {
    if(this.foundedUsers[index].id !== this.userId) {
      const modal = await this.modalCtrl.create({
        component: FollowComponent,
        componentProps: { user: this.foundedUsers[index] },
      });
      await modal.present();
    }
  }
}
