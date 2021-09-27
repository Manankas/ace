import { Component, Input, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Project} from '../../../models/project/Project';
import {DeletedListComponent} from '../../trash/deleted-list/deleted-list.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-project-archive',
  templateUrl: './project-archive.component.html',
  styleUrls: ['./project-archive.component.scss'],
})
export class ProjectArchiveComponent implements OnInit {
  @Input()projects: Project[]
  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) { }

  ngOnInit() {}

  async openProjectArchiveListModal() {
    const modal = await this.modalCtrl.create({
      component: DeletedListComponent,
      componentProps: {
        data: this.projects,
        path: 'projects',
        title: this.translate.instant('archive.title')
      }
    });
    await modal.present();
  }
}
