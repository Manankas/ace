import {Component, Input, OnInit} from '@angular/core';
import {EditorData} from '../../shared/wysiwyg/wysiwyg.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ChallengeSubmissionComponent} from './challenge-submission/challenge-submission.component';
import {Participation} from '../../../models/challenge/Participation';
import {ModalController} from '@ionic/angular';
import { cloneDeep } from 'lodash';
import {Challenge} from '../../../models/challenge/Challenge';
import {ChallengeInfoComponent} from '../challenge-info/challenge-info.component';

@Component({
  selector: 'app-challenge-editor',
  templateUrl: './challenge-editor.component.html',
  styleUrls: ['./challenge-editor.component.scss'],
})
export class ChallengeEditorComponent implements OnInit{
  @Input()participation: Participation;
  @Input()challenge: Challenge;
  constructor(
    private bottomSheet: MatBottomSheet,
    private modalCtrl: ModalController
  ) {}
  ngOnInit(): void {
    if(!this.participation) this.participation = new Participation();
    else this.participation = cloneDeep(this.participation);
    this.participation.challengeId = this.challenge.id;
  }
  public save(data: EditorData) {
    this.bottomSheet.open(ChallengeSubmissionComponent, {
      data: { title: this.participation.title, finished: this.participation.finished }
    })
      .afterDismissed()
      .subscribe(async d => {
        if(d?.params) {
          this.participation.finished = d.params.finished;
          this.participation.title = d.params.title;
          this.participation.content = data.content;
          await this.modalCtrl.dismiss({ participation: this.participation })
        }
      })
  }
  public showChallenge() {
    this.bottomSheet.open(ChallengeInfoComponent, {
      data: {challenge: this.challenge}
    })
  }
}
