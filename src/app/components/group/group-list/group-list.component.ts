import { ModalController } from '@ionic/angular';
import {Component, Input, OnInit} from '@angular/core';
import { GroupAddFormComponent } from '../group-add-form/group-add-form.component';
import {Group} from '../../../models/project/Group';
import {GroupDetailsComponent} from '../group-details/group-details.component';
import {Character} from '../../../models/project/Character';
import {SharedTreeComponent} from '../../shared/shared-tree/shared-tree.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  @Input()projectId: string;
  @Input()groups: Group[];
  @Input()characters: Character[];
  constructor(
    private modalController: ModalController
  ) {}

  async ngOnInit() {
  }
  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }

  async groupAddFormModal() {
    const modal = await this.modalController.create({
      component: GroupAddFormComponent,
      componentProps: { projectId: this.projectId },
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(({ data }) => {
      if(data?.group) this.groups.unshift(data.group);
    })
    await modal.present();
  }

  async groupDetailsModal(index: number) {
    const modal = await this.modalController.create({
      component: GroupDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        groups: this.groups,
        selectedGroup: this.groups[index],
        characters: this.characters,
        projectId: this.projectId
      }
    });
    return await modal.present();
  }

  async openGroupTree() {
    const modal = await this.modalController.create({
      component: SharedTreeComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        data: this.groups
      }
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.node && data.node.id !== 0)
        await this.groupDetailsModal(this.groups.findIndex(l => l.id === data.node.id));
    })
    await modal.present();
  }
}
