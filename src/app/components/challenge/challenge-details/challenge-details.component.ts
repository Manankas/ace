import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

import { Share } from '@capacitor/share';
import {
  AlertController,
  IonInfiniteScroll,
  ModalController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Challenge } from '../../../models/challenge/Challenge';
import { Participation } from '../../../models/challenge/Participation';
import { User } from '../../../models/User';
import { ParticipationService } from '../../../services/challenge/participation.service';
import { UserService } from '../../../services/user.service';
import { toDate } from '../../../utils/date';
import { ChallengeEditorComponent } from '../challenge-editor/challenge-editor.component';
import { ChallengeFormComponent } from '../challenge-form/challenge-form.component';
import { ParticipationDetailsComponent } from '../participation-details/participation-details.component';

export type UserChallenge = {
  participation: Participation;
  user: User;
};
@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.scss'],
})
export class ChallengeDetailsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() challenge: Challenge;
  @Input() user: User;
  public userChallenges: UserChallenge[] = [];
  public hasParticipated = true;
  public toDate = toDate;
  public loading = true;
  private limit = 15;

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private participationService: ParticipationService,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.participationService
      .findFirst(this.challenge.id, this.limit, 'challengeId')
      .then(async (docs) => {
        this.loading = await this.setUsersChallenges(docs);
      })
      .finally(() => (this.loading = false));
  }

  public async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  public async openParticipateModal() {
    const modal = await this.modalCtrl.create({
      component: ChallengeEditorComponent,
      componentProps: { challenge: this.challenge },
      cssClass: 'modal-fullscreen',
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if (data?.participation) {
        data.participation.userId = this.user.id;
        this.participationService.add(data.participation).then((part) => {
          this.userChallenges.unshift({
            participation: part,
            user: this.user,
          });
          this.hasParticipated = true;
        });
      }
    });
    await modal.present();
  }
  public async showParticipationDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: ParticipationDetailsComponent,
      componentProps: {
        userChallenge: this.userChallenges[index],
        challenge: this.challenge,
        currentUser: this.user,
      },
      cssClass: 'modal-fullscreen',
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data?.participation)
        Object.assign(
          this.userChallenges[index].participation,
          data.participation
        );
      else if (data?.removed) this.userChallenges.splice(index, 1);
    });
    await modal.present();
  }
  /**update challenge*/
  public async openUpdateChallengeModal() {
    const modal = await this.modalCtrl.create({
      component: ChallengeFormComponent,
      componentProps: { challenge: this.challenge },
      cssClass: 'modal-fullscreen',
    });
    await modal.present();
  }
  /**delete challenge*/
  public async removeChallenge() {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant('trash.delete.header'),
      message: this.translate.instant('trash.delete.forever'),
      buttons: [
        {
          text: this.translate.instant('buttons.cancel'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('trash.buttons.deleteForever'),
          handler: async () => {
            await this.modalCtrl.dismiss({
              remove: true,
              id: this.challenge.id,
            });
          },
        },
      ],
    });
    await alert.present();
  }
  /**pagination des challenges**/
  private async setUsersChallenges(
    docs: QueryDocumentSnapshot<Participation>[],
    nextDocs = false
  ): Promise<boolean> {
    return await new Promise((resolve) => {

      const participations: Participation[] = [];
      this.userService.findUserByIds(
        docs.map((doc, index) => {
          participations.push({ ...doc.data(), id: doc.id });
          return participations[index].userId;
        })
      )
        .then((users) => {
        users.push(this.user);
        let hasParticipated = false;
        const usersChallenges = participations.map((participation, index) => {
          if (!hasParticipated)
            hasParticipated = participation.userId === this.user.id;
          return {
            participation,
            user: users.find((u) => u.id === participation.userId),
          };
        });
        this.hasParticipated = hasParticipated;
        if (nextDocs) this.userChallenges.push(...usersChallenges);
        else this.userChallenges = usersChallenges;
        resolve(false);
      });
    });
  }
  public loadChallengers(event: any) {
    this.loading = true;
    if (this.userChallenges.length >= this.limit) {
      const last =
        this.userChallenges[this.userChallenges.length - 1].participation
          .createdAt;
      this.participationService
        .findNext(this.challenge.id, this.limit, last, 'challengeId')
        .then(async (docs) => {
          this.loading = await this.setUsersChallenges(docs, true);
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

  public async shareChallenge() {
    await Share.share({
      title: this.challenge.title,
      text:
        this.challenge.title + String.fromCharCode(10) + this.challenge.content,
      dialogTitle: this.translate.instant('profile.share'),
    });
  }
}
