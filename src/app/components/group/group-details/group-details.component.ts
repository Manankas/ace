import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Group } from '../../../models/project/Group';
import { GroupAddFormComponent } from '../group-add-form/group-add-form.component';
import { GroupUpdateFormComponent } from '../group-update-form/group-update-form.component';
import {groupCategories, groupIcons} from '../groupData';
import {getKeys} from '../../../utils/utils';
import {Character} from '../../../models/project/Character';
import {SharedTreeComponent} from '../../shared/shared-tree/shared-tree.component';
import {AlertService} from '../../../services/alert.service';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  @Input()projectId: string;
  @Input()groups: Group[];
  @Input()selectedGroup: Group;
  @Input()characters: Character[];
  public getKeys = getKeys;
  public categoryKeys = groupCategories;
  public icons = groupIcons;
  public isEntered = false;

  constructor(
    private modalCtrl: ModalController,
    private projectService: ProjectService,
    private $alert: AlertService,
    private loading: LoadingService,
    private $toast: ToastService,
    private translate: TranslateService
  ) {}
  ngOnInit() {}

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  ionViewWillEnter() {
    this.isEntered = true;
  }
  /***call details component it-self*/
  public async showGroupDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: GroupDetailsComponent,
      componentProps: {
        groups: this.groups,
        selectedGroup: this.groups[index],
        characters: this.characters
      },
      cssClass: 'modal-fullscreen'
    });

    await modal.present();
  }
  /***filter members*/
  public getMembers(members: number[]): Character[] {
    return this.characters.filter(c => members.includes(c.id));
  }
  public async openAddGroupForm() {
    const modal = await this.modalCtrl.create({
      component: GroupAddFormComponent,
      componentProps: { projectId: this.projectId, parentId: this.selectedGroup.id },
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if (data?.group) this.groups.unshift(data.group);
    });
    await modal.present();
  }

  public async openUpdateGroup() {
    const modal = await this.modalCtrl.create({
      component: GroupUpdateFormComponent,
      componentProps: {
        group: this.selectedGroup,
        characters: this.characters,
        projectId: this.projectId
      },
      cssClass: 'modal-fullscreen'
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.updatedGroup) {
        await this.loading.start(
          data.updatedGroup.archived ?
            this.translate.instant('delete.loading') :
            this.translate.instant('update.loading')
        );
        const { avatar,images, ...res } = data?.updatedGroup;
        this.projectService.updateMap(this.projectId, 'groups', res)
          .then(async () => {
            await this.$toast.presentToast(
              data.updatedGroup.archived ?
                this.translate.instant('delete.success') :
                this.translate.instant('update.success')
            );
            Object.assign<Group, Group>(this.selectedGroup, data?.updatedGroup);
            await this.close()
          })
          .finally(async () => { await this.loading.stop(); });
      }
    })
    await modal.present();
  }
  /**Moving group*/
  async openGroupTreeModal() {
    const modal = await this.modalCtrl.create({
      component: SharedTreeComponent,
      componentProps: {
        data: this.groups,
        title: this.translate.instant('moveTo.title')
      },
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(async ({data}) =>{
      if(data?.node) {
        if(this.selectedGroup.id !== data.node.id) {
          this.selectedGroup.parentId = data.node.id;
          const { avatar, images, ...res } = this.selectedGroup;
          this.projectService.updateMap(this.projectId, 'groups', res)
            .then(async () => {
              const p = data.node?.general ? data.node.general.name : data.node.name;
              await this.$alert.present(this.selectedGroup.general.name + ' -> ' + p);
          });
        } else {
          await this.$alert.present(this.translate.instant('moveTo.errorMessage'));
        }
      }
    })
    await modal.present();
  }
}
