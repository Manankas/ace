import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';
import { Group } from 'src/app/models/project/Group';
import { Character } from '../../../models/project/Character';
import { User } from '../../../models/User';
import { getKeys } from '../../../utils/utils';
import { ImageModalComponent } from '../../image-modal/image-modal.component';
import {groupCategories, groupIcons} from '../groupData';
import { AddMemberComponent } from './add-member/add-member.component';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-group-update-form',
  templateUrl: './group-update-form.component.html',
  styleUrls: ['./group-update-form.component.scss'],
})
export class GroupUpdateFormComponent implements OnInit {
  @Input()projectId: string;
  @Input() group: Group;
  @Input() characters: Character[];
  public groupClone: Group;
  public members: User[];
  public getKeys = getKeys;
  public groupObjectKeys = groupCategories;
  public icons = groupIcons;
  constructor(
    private modalController: ModalController,
    private projectService: ProjectService,
    private $alert: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.groupClone = cloneDeep(this.group);
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  /***filter members*/
  public getMembers(members: number[]): Character[] {
    return  this.characters.filter((c) => members.includes(c.id));
  }

  async updateGroup() {
    await this.modalController.dismiss({ updatedGroup: this.groupClone });
  }

  async openImageModal() {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      cssClass: 'modal-fullscreen',
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if (data.image.url) {
        this.group.avatar = data.image.url;
        this.groupClone.avatar = data.image.url;
        await this.projectService.updateMap(
          this.projectId,'groups',
          {id: this.group.id, avatar: data.image.name}
        );
      }
    });
    return await modal.present();
  }

  async openAddMembersModal() {
    const modal = await this.modalController.create({
      component: AddMemberComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        characters: this.characters.filter(
          (c) => !this.groupClone.members.includes(c.id)
        ),
      },
    });
    modal.onDidDismiss().then(({ data }) => {
      this.groupClone.members.push(...data.selected);
    });
    await modal.present();
  }
  public removeMember(index: number) {
    this.groupClone.members.splice(index, 1);
  }
  public async deleteConfirm() {
    const alert = await this.$alert.create({
      subHeader: this.translate.instant('trash.delete.header'),
      message: this.translate.instant('trash.delete.message'),
      buttons: [
        {
          text: this.translate.instant('trash.buttons.keep'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('trash.buttons.softDelete'),
          handler: async () => {
            Object.assign(this.groupClone, { archived: true });
            await this.updateGroup();
          },
        },
      ],
    });
    await alert.present();
  }
}
