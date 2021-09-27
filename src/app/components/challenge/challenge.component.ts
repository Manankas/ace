import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Challenge } from '../../models/challenge/Challenge';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { ChallengeDetailsComponent } from './challenge-details/challenge-details.component';
import { ChallengeFormComponent } from './challenge-form/challenge-form.component';
import {IndexeddbService} from '../../services/indexeddb.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public challenges: Challenge[] = [];
  public user: User;
  private limit = 15;
  public loading = true;

  constructor(
    private modalCtrl: ModalController,
    private challengeService: ChallengeService,
    private indexDbService: IndexeddbService,
  ) {}

  async ngOnInit() {
    this.user = await this.indexDbService.get('user');
    this.challengeService.findFirst(this.limit, this.user.isAdmin).then((val) => {
      this.challenges = val;
      this.loading = false;
    });
  }
  public async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
  public async showChallengeDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: ChallengeDetailsComponent,
      componentProps: { challenge: this.challenges[index], user: this.user },
      cssClass: 'modal-fullscreen',
    });
    modal.onWillDismiss().then(({ data }) => {
      if(data?.remove){
        this.challenges.splice(index, 1);
        this.challengeService.remove(data.id);
      }
    })
    await modal.present();
  }

  public async openAddChallengeForm() {
    const modal = await this.modalCtrl.create({
      component: ChallengeFormComponent,
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data?.challenge) this.challenges.unshift(data.challenge);
    });
    await modal.present();
  }

  public async loadMoreChallenges(event: any) {
    if (this.challenges.length >= this.limit) {
      this.challengeService
        .findNext(
          this.limit,
          this.challenges[this.challenges.length - 1].createdAt,
          this.user.isAdmin
        )
        .then((cls) => this.challenges.push(...cls))
        .finally(() => event.target.complete());
    } else event.target.complete();
  }
}
