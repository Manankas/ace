import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalController } from '@ionic/angular';
import { Chapter } from '../../../../models/project/Chapter';
import { ChapterFormComponent } from '../chapter-form/chapter-form.component';
import { ProjectService } from '../../../../services/project.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss'],
})
export class ChaptersListComponent {
  @Input() projectId: string;
  @Input() sizeType: number;
  @Input() chapters: Chapter[];
  constructor(
    private modalController: ModalController,
    private _bottomSheet: MatBottomSheet,
    private projectService: ProjectService,
    private translate: TranslateService,
  ) {}

  async dismiss() {
    await this.modalController.dismiss();
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
      data: { title: this.translate.instant('chapter.updateTitle'), chapter: this.chapters[index] },
    });
    this._bottomSheet._openedBottomSheetRef
      .afterDismissed()
      .subscribe((chapter: Chapter) => {
        if (chapter) {
          const {sessions, ...res} = chapter;
          Object.assign<Chapter, Omit<Chapter, 'sessions'>>(this.chapters[index], res);
          this.projectService.updateMap(this.projectId, 'chapters', res);
        }
      });
  }
}
