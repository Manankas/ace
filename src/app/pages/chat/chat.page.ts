import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {SearchUsersComponent} from '../../components/chat/search-users/search-users.component';
import {FollowerService} from '../../services/follower.service';
import {MessageService} from '../../services/message.service';
import {IndexeddbService} from '../../services/indexeddb.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {QueryDocumentSnapshot} from '@angular/fire/firestore';
import {Follower} from '../../models/Follower';
import {ChatFormComponent} from '../../components/chat/chat-form/chat-form.component';
import {JsonArray} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public recentConv: Array<{recipient: User; message: string; followerId: string; senderId: unknown; date: number}> = [];
  private followersLimit = 10;
  public userId: string;
  public recentConvLoading = true;
  constructor(
    private modalCtrl: ModalController,
    private followerService: FollowerService,
    private userService: UserService,
    private messageService: MessageService,
    private indexDbService: IndexeddbService
  ) {
  }

  async ngOnInit() {
    this.userId = (await this.indexDbService.get('user')).id;
    await this.setRecentConv(await this.followerService.findFirst(this.userId, this.followersLimit));
    this.recentConvLoading = false;
  }

  async openSearchProject() {
    const modal = await this.modalCtrl.create({
      component: SearchUsersComponent,
      componentProps: {userId: this.userId },
      cssClass: 'modal-fullscreen'
    });
    await modal.present();
  }
  private async setRecentConv(docs: QueryDocumentSnapshot<Follower>[], first= false) {
    const userIds = new Set<string>(docs.map(doc => this.partnerId(doc.data().partners)));
    const users = await this.userService.findUserByIds([...userIds]);
    const recentConv = await Promise.all(docs.map(async doc => {
        const f = doc.data();
        const { content: message, convId } = await this.messageService.findLatestConv(f.partners);
        return {
          recipient: users.find(u => u.id === this.partnerId(f.partners)),
          message, senderId: convId[0], date: f.lastConversation,
          followerId: f.id
        }
      })
    );
    if(first)this.recentConv.push(...recentConv);
    else this.recentConv = recentConv;
  }
  public loadMoreRecentDiscussions(event: any) {
    const size = this.recentConv.length;
    if(size >= this.followersLimit) {
      this.followerService.findNext(this.userId, this.followersLimit, this.recentConv[size - 1].date)
        .then(followers => {
          this.setRecentConv(followers)
            .then(() => { event.target.complete()});
        }).finally(() => event.target.complete());
    }
  }

  public async openDiscussion(index: number) {
    const modal = await this.modalCtrl.create({
      component: ChatFormComponent,
      componentProps: {
        recipient: this.recentConv[index].recipient,
        followerId: this.recentConv[index].followerId
      }
    })
    modal.onWillDismiss().then(({ data }) => {
      if(data?.lastMsg) {
        const rec = this.recentConv.find(r => r.recipient.id === this.partnerId(data.lastMsg.convId));
        if(rec) {
          rec.message = data.lastMsg.content;
          rec.date = data.lastMsg.createdAt;
          rec.senderId = data.lastMsg.convId[0];
        }
      }
    })
    await modal.present();
  }
  private partnerId(ids: JsonArray): string {
    return String(ids.find(id => id.toString() !== this.userId));
  }
}
