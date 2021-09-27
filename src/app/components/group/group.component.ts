import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Character } from '../../models/project/Character';
import { Group } from '../../models/project/Group';
import { GroupListComponent } from './group-list/group-list.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input() projectId: string;
  @Input() groups: Group[];
  @Input() characters: Character[];
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async groupListModal() {
    const modal = await this.modalController.create({
      component: GroupListComponent,
      componentProps: {
        projectId: this.projectId,
        groups: this.groups,
        characters: this.characters,
      },
      cssClass: 'modal-fullscreen',
    });
    return await modal.present();
  }
}
