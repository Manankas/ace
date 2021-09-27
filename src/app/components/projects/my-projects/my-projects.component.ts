import { Component, Input, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Chapter } from '../../../models/project/Chapter';
import { Project } from '../../../models/project/Project';
import { scheduleProjectAlarm } from '../../../utils/utils';
import { DetailsProjectComponent } from '../../details-project/details-project.component';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit {
  @Input() projects: Project[];
  private requestedIndexes: Set<number> = new Set<number>(); /**nothing*/
  constructor(
    public platform: Platform,
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  public async openProjectDetails(i: number) {
    const modal = await this.modalCtrl.create({
      component: DetailsProjectComponent,
      componentProps: {
        project: this.projects[i],
        needToRequest: !this.requestedIndexes.has(i),
      },
      cssClass: 'modal-fullscreen',
    });
    modal.onWillDismiss().then(() => {
      this.requestedIndexes.add(i);
      const remainWord =
        this.projects[i].size -
        (this.projects[i].chapters as Chapter[]).reduce(
          (sum, curr) => (sum += curr.wordCount),
          0
        );
      const sizeType = this.translate.instant('project.sizeTypes')[this.projects[i].sizeType];

      const notif = {
        body: this.translate.instant('projectSettings.notify.body', { remainWord: `${remainWord} ${sizeType}` }),
        inboxList: this.translate.instant('projectSettings.notify.inboxList', {
          remainWord,
          sizeType
        }).split('-')
      }
      scheduleProjectAlarm(this.projects[i], { notif, remainWord });
    });

    await modal.present();
  }
}
