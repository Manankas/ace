import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ModalController } from '@ionic/angular';

import { Chapter } from '../../../models/project/Chapter';
import { ProjectService } from '../../../services/project.service';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';
import { ChaptersListComponent } from './chapters-list/chapters-list.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent {
  @Input() projectId: string;
  @Input() sizeType: number;
  @Input() chapters: Chapter[];
  @Input() showListBtn = true;
  constructor(
    private modalController: ModalController,
    private _bottomSheet: MatBottomSheet,
    private projectService: ProjectService,
    private translate: TranslateService,
  ) {
    // setTimeout(() => {
    //   alert(JSON.stringify(this.chapters));
    // }, 3000);
  }

  async dismiss() {
    await this.modalController.dismiss({ dismissed: true });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ChapterFormComponent, {
      panelClass: 'bottom-sheet',
      data: { title: this.translate.instant('chapter.addTitle') },
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
  openUpdateBottomSheet(index: number): void {
    this._bottomSheet.open(ChapterFormComponent, {
      panelClass: 'bottom-sheet',
      data: {
        title: this.translate.instant('chapter.updateTitle'),
        chapter: this.chapters[index],
      },
    });
    this._bottomSheet._openedBottomSheetRef
      .afterDismissed()
      .subscribe((chapter: Chapter) => {
        if (chapter) {
          const { sessions, ...res } = chapter;
          Object.assign<Chapter, Omit<Chapter, 'sessions'>>(
            this.chapters[index],
            res
          );
          this.projectService.updateMap(this.projectId, 'chapters', res);
        }
      });
  }

  public openChapterListModal() {
    this.modalController
      .create({
        component: ChaptersListComponent,
        componentProps: {
          projectId: this.projectId,
          chapters: this.chapters,
          sizeType: this.sizeType,
        },
      })
      .then((modal) => modal.present());
  }

  public firstChapter() {
    return this.chapters.filter((c) => !c.archived);
  }
}
