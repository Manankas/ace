import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Project } from '../../models/project/Project';
import { UploadService } from '../../services/upload.service';
import { ProjectSettingsComponent } from '../project-settings/project-settings.component';
import { TaskListComponent } from '../taches/task-list/task-list.component';
import {Task} from '../../models/project/Task';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.scss'],
})
export class DetailsProjectComponent implements OnInit {
  public isEntered = false;
  @Input() project: Project;
  @Input() private needToRequest: boolean;
  public isHiddenAbout: boolean;
  public loading: boolean[] = Array(6).fill(true);
  public btnToggle = false;

  constructor(
    private router: ActivatedRoute,
    private uploadService: UploadService,
    private modalController: ModalController
  ) { this.isHiddenAbout = true; }

  async ngOnInit() {
    if (this.needToRequest) {
      /**if never got data*/
      this.getArrayData(this.project.characters).then(
        (data) => (this.project.characters = data)
      );

      this.getArrayData(this.project.groups).then(
        (data) => (this.project.groups = data)
      );

      this.getArrayData(this.project.wLocations)
        .then((data) => (this.project.wLocations = data))
        .finally(() => (this.loading[2] = false));

      this.getArrayData(this.project.items).then(
        (data) => (this.project.items = data)
      );

      this.getArrayData(this.project.species).then(
        (data) => (this.project.species = data)
      );

      this.getArrayData(this.project.notes).then(
        (data) => (this.project.notes = data)
      );

      this.getArrayData(this.project.timelines).then(
        (data) => (this.project.timelines = data)
      );
      this.getArrayData(this.project.chapters).then(
        (data) => (this.project.chapters = data)
      );
      this.getArrayData(this.project.tasks).then(
        (data: Task[]) => (this.project.tasks = data.sort((a, b) => b.updatedAt - a.updatedAt))
      );
    } else this.loading.fill(false);
  }

  ionViewWillEnter() {
    this.isEntered = true;
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }

  async presentTachesModal() {
    const modal = await this.modalController.create({
      component: TaskListComponent,
      componentProps: {
        projectId: this.project.id,
        tasks: this.toArray(this.project.tasks)
      },
      cssClass: 'modal-fullscreen',
    });
    return await modal.present();
  }

  async presentProjectSettingsModal() {
    const modal = await this.modalController.create({
      component: ProjectSettingsComponent,
      componentProps: { project: this.project },
      cssClass: 'modal-fullscreen',
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      setTimeout(async () => {
        await this.close();
      }, 0);
    });
  }
  private async getArrayData(obj: any): Promise<any[]> {
    const data: any[] = [];
    for (const [key, val] of Object.entries(obj) as any) {
      if (val?.avatar !== undefined) {
        if (val.avatar)
          val.avatar = await this.uploadService.getFileUrl(
            this.project.userId,
            val.avatar
          );
        for (let name of val.images) {
          name = await this.uploadService.getFileUrl(this.project.userId, name);
        }
      }
      val.id = parseInt(key, 10);
      data.push(val);
    }
    return data;
  }
  public toArray(data: any): any[] {
    return Array.isArray(data) ? data : [];
  }
}
