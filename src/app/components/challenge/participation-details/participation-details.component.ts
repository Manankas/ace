import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Challenge } from 'src/app/models/challenge/Challenge';

import { Share } from '@capacitor/share';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { ParticipationService } from '../../../services/challenge/participation.service';
import { ToastService } from '../../../services/toast.service';
import { toDate } from '../../../utils/date';
import { FollowComponent } from '../../follower/follow/follow.component';
import { UserChallenge } from '../challenge-details/challenge-details.component';
import { ChallengeEditorComponent } from '../challenge-editor/challenge-editor.component';
import { ChallengeInfoComponent } from '../challenge-info/challenge-info.component';
import {Comment} from '../../../models/challenge/Participation';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';

type UserComment = {
  user: User;
  comment: Comment;
}
@Component({
  selector: 'app-participant-details',
  templateUrl: './participation-details.component.html',
  styleUrls: ['./participation-details.component.scss'],
})
export class ParticipationDetailsComponent implements OnInit {
  @Input() userChallenge: UserChallenge;
  @Input() challenge: Challenge;
  @Input() currentUser: User;
  public currentUserId: string;
  public toDate = toDate;
  public isCurrUserOwner: boolean;
  public likeIndex = -1;
  public comment: Comment;
  public comments: UserComment[] = [];
  constructor(
    private modalCtrl: ModalController,
    private bottomSheet: MatBottomSheet,
    private translate: TranslateService,
    private toast: ToastService,
    private participationService: ParticipationService,
    private userService: UserService,
    private alertCtrl: AlertController
  ) {}
  ngOnInit() {
    this.currentUserId = this.currentUser?.id||this.userChallenge.user.id;
    this.isCurrUserOwner = this.userChallenge.user.id === this.currentUserId;
    this.likeIndex = this.userChallenge.participation.like.findIndex(
      (l) => l === this.currentUserId
    );
    this.comment = new Comment();
    this.comment.userId = this.currentUserId;
    const userIds = new Set<string>();
    if(!Array.isArray(this.userChallenge.participation.comments)) {
      const comments: Comment[] = [];
      for (const [key, val] of Object.entries(this.userChallenge.participation.comments) as any) {
        comments.push({id: key, ...val});
        if(this.currentUserId !== val.userId) userIds.add(val.userId);
      }
      this.userChallenge.participation.comments = comments;
    } else this.userChallenge.participation.comments.forEach(c => {
      if(this.currentUserId !== c.userId) userIds.add(c.userId);
    })

    this.userService.findUserByIds(Array.from(userIds))
      .then(users => {
        this.comments = (this.userChallenge.participation.comments as Comment[]).map(comment => {
          return {
            user: this.currentUserId !== comment.userId ? users.find(u => u.id = comment.userId) : this.userChallenge.user,
            comment
          }
        })
      });
  }
  public async close() {
    this.userChallenge.participation.comments = this.comments.map(c => c.comment);
    await this.modalCtrl.dismiss({
      dismissed: true,
      participation: this.userChallenge.participation,
    });
  }

  public openChallengeInfo() {
    this.bottomSheet.open(ChallengeInfoComponent, {
      data: { challenge: this.challenge },
      panelClass: 'bottom-sheet',
    });
  }

  public async openFollow(userId = this.userChallenge.user.id) {
    if (this.currentUserId !== userId) {
      const modal = await this.modalCtrl.create({
        component: FollowComponent,
        componentProps: { user: this.userChallenge.user },
        cssClass: 'modal-fullscreen',
      });
      await modal.present();
    }
  }

  public async updateMyChallenge() {
    const modal = await this.modalCtrl.create({
      component: ChallengeEditorComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        participation: this.userChallenge.participation,
        challenge: this.challenge,
      },
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data?.participation) {
        Object.assign(this.userChallenge.participation, data.participation);
        this.participationService
          .update(this.userChallenge.participation)
          .then(() => {
            this.toast.presentToast(this.translate.instant('update.success'));
          });
      }
    });
    await modal.present();
  }
  public onClickLikeBtn() {
    if (this.likeIndex < 0) {
      this.userChallenge.participation.like.push(this.currentUserId);
      this.participationService
        .like(this.userChallenge.participation.id, this.currentUserId)
        .then(
          () =>
            (this.likeIndex = this.userChallenge.participation.like.length - 1)
        );
    } else {
      this.userChallenge.participation.like.splice(this.likeIndex);
      this.participationService
        .unlike(this.userChallenge.participation.id, this.currentUserId)
        .then(() => (this.likeIndex = -1));
    }
  }
  public removeParticipation() {
    this.alertCtrl
      .create({
        subHeader: this.translate.instant('trash.restore.header'),
        message: this.translate.instant('trash.delete.forever'),
        buttons: [
          {
            text: this.translate.instant('buttons.cancel'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('trash.buttons.deleteForever'),
            handler: async () => {
              this.participationService
                .remove(this.userChallenge.participation.id)
                .then(() =>
                  this.modalCtrl.dismiss({ dismissed: true, removed: true })
                );
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  public async shareChallenge() {
    const tempDivElement = document.createElement('div');
    tempDivElement.innerHTML = this.userChallenge.participation.content;
    const content =
      tempDivElement.textContent || tempDivElement.innerText || '';

    await Share.share({
      title:
        this.translate.instant('challenge.participationOf', {
          name: this.userChallenge.user.nom + ' ' + this.userChallenge.user.prenom,
          title: this.challenge.title
        }),
      text:
        this.userChallenge.participation.title +
        String.fromCharCode(10) +
        content,
      dialogTitle: this.translate.instant('profile.share'),
    });
  }
  public updateComments() {
    if(this.comment.id === 0) {
      this.comment.id = Date.now();
      this.comments.push({user: this.currentUser||this.userChallenge.user, comment: {...this.comment}});
    }
    else {
      const comment = this.comments.find(c => c.comment.id === this.comment.id);
      comment.comment.content = this.comment.content;
    }
    this.participationService.updateComments(this.userChallenge.participation.id, this.comment);
    this.comment.content = '';
    this.comment.id = 0;
  }
  public setComment(i){
    Object.assign<Comment, Comment>(this.comment, this.comments[i].comment);
  }
  public resetComment(val: string) {
    if(!val)this.comment.id = 0;
  }
  public deleteComment(index: number) {
    this.participationService.deleteComment(this.userChallenge.participation.id, this.comments[index].comment.id)
    this.comments.splice(index, 1);
  }
}
