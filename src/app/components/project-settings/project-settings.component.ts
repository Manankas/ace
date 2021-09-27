import { Component, Input, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { Project } from '../../models/project/Project';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import {ProjectService} from '../../services/project.service';
import {TranslateService} from '@ngx-translate/core';
import { cloneDeep } from 'lodash';
import {ToastService} from '../../services/toast.service';
import {Chapter} from '../../models/project/Chapter';
import {removeLastSOcc, scheduleProjectAlarm} from '../../utils/utils';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss'],
})
export class ProjectSettingsComponent implements OnInit {
  @Input() project: Project;
  public remainWord = 0;
  public removeLastSOcc = removeLastSOcc;
  constructor(
    private modalCtrl: ModalController,
    private projectService: ProjectService,
    private alertCtrl: AlertController,
    private toast: ToastService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.remainWord = this.project.size - (this.project.chapters as Chapter[])
      .reduce((sum, curr) => sum += curr.wordCount, 0)
  }
  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  async openEditProjectModal() {
    const modal = await this.modalCtrl.create({
      component: EditProjectComponent,
      componentProps: { project: cloneDeep(this.project) },
      cssClass: 'modal-fullscreen'
    });
    modal.onWillDismiss().then(({ data }) => {
      if(data?.updatedProject) {
        this.projectService.updateField(this.project.id, data.updatedProject)
          .then(() => {
            Object.assign<Project, typeof data.updatedProject>(this.project, data.updatedProject);
            this.toast.presentToast(this.translate.instant('update.success'));
          })
          .catch(() => {
            this.toast.presentToast(this.translate.instant('update.fail'));
          })
      }
    })
    return await modal.present();
  }

  async openProjectCoverModal() {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if(data.image.url) {
        this.project.avatar = data.image.url;
        await this.projectService.updateField(this.project.id, {avatar: data.image.name});
      }
    })
    return await modal.present();
  }
  public async deleteConfirm() {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant('trash.delete.header'),
      message: this.translate.instant('archive.delete.message'),
      buttons: [
        {
          text: this.translate.instant('trash.buttons.keep'),
          role: 'cancel'
        },
        {
          text: this.translate.instant('archive.buttons.softDelete'),
          handler: () => {
            Object.assign(this.project, { archived: true });
            this.projectService.updateField(this.project.id, { archived: true });
            this.close();
          }
        }
      ]
    });
    await alert.present();
  }

  public notify() {
    this.projectService.updateField(this.project.id, {notify: this.project.notify});
    const sizeType = this.translate.instant('project.sizeTypes')[this.project.sizeType];
    const notif = {
      body: this.translate.instant('projectSettings.notify.body', {
        remainWord: `${this.remainWord} ${sizeType}`
      }),
      inboxList: this.translate.instant('projectSettings.notify.inboxList', {
        remainWord: this.remainWord,
        sizeType
      }).split('-')
    }
    scheduleProjectAlarm(this.project, {notif, remainWord: this.remainWord});
  }
}
