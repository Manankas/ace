import {Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Project } from '../../models/project/Project';
import { AlertService } from '../../services/alert.service';
import { CollaborationService } from '../../services/collaboration.service';
import { IndexeddbService } from '../../services/indexeddb.service';
import { LoadingService } from '../../services/loading.service';
import { ProjectService } from '../../services/project.service';
import { RequestCodeComponent } from '../collaboration/request-code/request-code.component';
import { FormAddComponent } from './form-add/form-add.component';
import {Member} from '../../models/chat/Member';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public commonProjects: Project[] = [];
  private achievements = {pProject: false, cProject: true};
  public loading = [true, true];
  public userId: string;
  constructor(
    private modalController: ModalController,
    private collaborationService: CollaborationService,
    private projectService: ProjectService,
    private indexeddbService: IndexeddbService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    const { id } = await this.indexeddbService.get('user');
    this.userId = id;
    this.projectService.findByUserId(id)
      .then(projects => {
        this.projects = projects;
        this.setAchievements(projects.length > 0, 'pProject');
      })
      .finally(() => this.loading[0] = false)
      .catch(e => this.alertService.present('Erreur:' + e.message))
    this.collaborationService.findCollaborationProjects(id)
      .subscribe(async (actions) => {
        this.projectService.findByIds(actions.reduce((cum: string[], curr) =>
            cum.concat(curr.payload.doc.data().collaborationId)
          , [])
        ).then(pro => {
          this.commonProjects.length = 0; this.commonProjects.push(...pro);
          this.setAchievements( pro.length > 0, 'cProject');
        })
          .finally(() => this.loading[1] = false)
          .catch(e => this.alertService.present('Erreur:' + e.message))
      })
  }

  async addProjectModal() {
    const modal = await this.modalController.create({
      component: FormAddComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { userId: this.userId },
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if (data.project) {
        this.loadingService.start('Création du projet ...');
        this.projectService
          .add(data.project)
          .then((pro) => {
            this.projects.unshift(pro);
            this.setAchievements(true, 'pProject');
          }).catch(() => this.alertService.present('Echec de crétion ...'))
          .finally(() => this.loadingService.stop())
      }
    });
    await modal.present();
  }

  async openRequestCodeModal() {
    const modal = await this.modalController.create({
      component: RequestCodeComponent,
      cssClass: 'modal-fullscreen',
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if (data.code) {
        this.loadingService.start(this.translate.instant('collaboration.request.verification'));
        this.projectService
          .findById(data.code)
          .then(async (verification) => {
              await this.loadingService.stop()
              this.loadingService.start(this.translate.instant('collaboration.request.send'));
              this.collaborationService
                .add(
                  {
                    id: verification.id,
                    active: false,
                    createdAt: Date.now(),
                  },
                  {
                    userId: this.userId,
                    banned: false,
                    role: 0,
                    active: true,
                    createdAt: Date.now(),
                  },
                  false
                ).then(() => this.alertService.present(this.translate.instant('collaboration.request.success')))
                .catch((member: Member) => {
                 if(member?.role > 0)
                   this.alertService.present(this.translate.instant('collaboration.request.isMember'));
                 else this.alertService.present(this.translate.instant('collaboration.request.wait'))
              }).finally(() =>  this.loadingService.stop())
          }).catch(() => this.alertService.present(this.translate.instant('collaboration.request.invalid')))
          .finally(() =>  this.loadingService.stop())
      }
    });
    await modal.present();
  }
  private setAchievements(val: boolean, key: 'pProject'|'cProject') {
    this.achievements[key] = val;
    this.indexeddbService.set('achievements', this.achievements);
  }
}
