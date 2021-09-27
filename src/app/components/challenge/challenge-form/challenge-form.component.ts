import {Component, Input, OnInit} from '@angular/core';

import { ModalController } from '@ionic/angular';
import {Challenge} from '../../../models/challenge/Challenge';
import {ChallengeService} from '../../../services/challenge/challenge.service';
import {getPicture} from '../../../utils/utils';
import {LoadingService} from '../../../services/loading.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.scss'],
})
export class ChallengeFormComponent implements OnInit{
  @Input()challenge: Challenge;
  public mode = 'update';
  public avatar = '';
  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private challengeService: ChallengeService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    if(!this.challenge) {
      this.challenge = new Challenge();
      this.mode = 'add';
    }
  }
  public async changeAvatar() {
    this.avatar = await getPicture();
  }

  public async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  };
  public async save() {
    if(this.mode === 'update') {
      await this.loading.start(this.translate.instant('challenge.form.update'));
      this.challengeService.update({...this.challenge, avatar: this.avatar})
        .then(async (challenge) => {
          if(!challenge.avatar)challenge.avatar = this.challenge.avatar;
          Object.assign<Challenge, Challenge>(this.challenge, challenge);
          await this.modalCtrl.dismiss({dismissed: true });
        })
        .finally(async () => await this.loading.stop())
    }
    else {
      await this.loading.start(this.translate.instant('challenge.form.creation'));
      this.challengeService.add({...this.challenge, avatar: this.avatar})
        .then(async (challenge) => {
          await this.modalCtrl.dismiss({
            dismissed: true,
            challenge
          });
        })
        .finally(async () => await this.loading.stop())
    }
  };


}
