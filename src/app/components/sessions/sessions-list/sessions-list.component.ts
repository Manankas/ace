import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import {
  AlertController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Chapter } from '../../../models/project/Chapter';
import { Session } from '../../../models/project/Session';
import { ProjectService } from '../../../services/project.service';
import { ToastService } from '../../../services/toast.service';
import { toDate } from '../../../utils/date';
import { ChapterFormComponent } from '../../details-project/chapters/chapter-form/chapter-form.component';
import { SessionFinishFormComponent } from '../session-finish-form/session-finish-form.component';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss'],
})
export class SessionsListComponent {
  @Input() projectId: string;
  @Input() chapters: Chapter[];
  public toDate = toDate;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private projectService: ProjectService,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private toast: ToastService
  ) {}
  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  public isSessionEmpty(chapters: Chapter[]): boolean {
    return chapters.filter((c) => !c.archived).length > 0;
  }
  public addSession(cIndex: number): void {
    const newSeance = new Session();
    this.chapters[cIndex].sessions.unshift({ ...newSeance });
    this.projectService.updateMap(this.projectId, 'chapters', {
      id: this.chapters[cIndex].id,
      sessions: this.chapters[cIndex].sessions,
    });
  }

  async openFinishSessionPopover(cIndex, sIndex: number) {
    const chapter = this.chapters[cIndex];
    if (!this.chapters[cIndex].sessions[sIndex].closed) {
      const popover = await this.popoverController.create({
        component: SessionFinishFormComponent,
        componentProps: { session: chapter.sessions[sIndex] },
      });
      popover.onWillDismiss().then(({ data }) => {
        if (data?.wordCount) {
          chapter.sessions[sIndex].closed = true;
          chapter.sessions[sIndex].wordCount = data.wordCount;
          chapter.wordCount += data.wordCount;
          this.projectService.updateMap(this.projectId, 'chapters', chapter);
        }
      });
      await popover.present();
    } else {
      this.toast.presentToast('Cette session a été cloturée!', 'warning');
    }
  }

  public editableSession(cIndex, sIndex: number) {
    const chapter = this.chapters[cIndex];
    chapter.sessions[sIndex].closed = false;
    this.projectService.updateMap(this.projectId, 'chapters', chapter);
  }

  public async removeSession(cIndex: number, sIndex: number) {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant('trash.delete.header'),
      buttons: [
        {
          text: this.translate.instant('buttons.cancel'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('trash.buttons.softDelete'),
          handler: () => {
            this.chapters[cIndex].sessions[sIndex].archived = true;
            this.projectService.updateMap(
              this.projectId,
              'chapters',
              this.chapters[cIndex]
            );
          },
        },
      ],
    });
    await alert.present();
  }

  addChapter(): void {
    this._bottomSheet.open(ChapterFormComponent, {
      panelClass: 'bottom-sheet',
      data: { title: 'Ajouter un chapitre' },
    });
    this._bottomSheet._openedBottomSheetRef
      .afterDismissed()
      .subscribe((chapter: Chapter) => {
        if (chapter) {
          this.chapters.push(chapter);
          this.projectService.updateMap(this.projectId, 'chapters', chapter);
        }
      });
  }
}
