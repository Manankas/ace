import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Challenge} from '../../../models/challenge/Challenge';
import {Participation} from '../../../models/challenge/Participation';
import {ChallengeService} from '../../../services/challenge/challenge.service';
import {ParticipationService} from '../../../services/challenge/participation.service';
import {QueryDocumentSnapshot} from '@angular/fire/firestore';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {ToastService} from '../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {ParticipationDetailsComponent} from '../participation-details/participation-details.component';
import {User} from '../../../models/User';

type MyChallenge = Challenge & {
  participation: Participation;
};

@Component({
  selector: 'app-user-challenges',
  templateUrl: './user-challenges.component.html',
  styleUrls: ['./user-challenges.component.scss'],
})
export class UserChallengesComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input()user: User;
  @Output()achievement = new EventEmitter<boolean>();
  public myChallenges: MyChallenge[] = [];
  private limit = 15;
  public loading = true;

  constructor(
    private challengeService: ChallengeService,
    private participationService: ParticipationService,
    private toast: ToastService,
    private translate: TranslateService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    let participated = false;
    this.participationService
      .findFirst(this.user.id, this.limit)
      .then(async (docs) => {
        this.loading = await this.setMyChallenges(docs);
        participated = docs.length > 0;
      })
      .finally(() => {
        this.loading = false;
        this.achievement.emit(participated);
      });
  }
  /**Pagination de mes exercices**/
  private async setMyChallenges(
    docs: QueryDocumentSnapshot<Participation>[],
    nextDocs = false
  ): Promise<boolean> {
    return await new Promise((resolve) => {
      const challengeIds: string[] = [];
      const myParticipations: Participation[] = [];
      docs.forEach((doc, index) => {
        myParticipations.push({ ...doc.data(), id: doc.id });
        challengeIds.push(myParticipations[index].challengeId);
      });
      this.challengeService
        .findByIds(challengeIds)
        .then((challenges) => {
          const myChallenges = myParticipations.map((participation) => ({
            participation,
            ...challenges.find((p) => p.id === participation.challengeId),
          }));
          if (nextDocs) this.myChallenges.push(...myChallenges);
          else this.myChallenges = myChallenges;
          resolve(false);
        });
    });
  }

  public loadMoreChallenges(event) {
    this.loading = true;
    if (this.myChallenges.length >= this.limit) {
      this.participationService
        .findNext(
          this.user.id,
          this.limit,
          this.myChallenges[this.myChallenges.length - 1].participation
            .createdAt
        )
        .then(async (docs) => {
          this.loading = await this.setMyChallenges(docs, true);
        })
        .finally(() => {
          event.target.complete();
          this.loading = false;
        });
    } else {
      event.target.complete();
      this.loading = false;
    }
  }

  public async openParticipationDetails(index: number) {
    const { participation, ...challenge} = this.myChallenges[index];
    const modal = await this.modalCtrl.create({
      component: ParticipationDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        userChallenge: { participation: this.myChallenges[index].participation, user: this.user},
        challenge,
      }
    })
    modal.onWillDismiss().then(({data}) => {
      if(data?.participation) Object.assign(this.myChallenges[index].participation, data.participation);
      else if(data?.removed) this.myChallenges.splice(index, 1);
    })
    await modal.present();
  }
}
