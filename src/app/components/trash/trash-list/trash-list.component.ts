import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {trashIcons} from '../trashData';
import {DeletedListComponent} from '../deleted-list/deleted-list.component';
import {Project} from '../../../models/project/Project';

@Component({
  selector: 'app-trash-list',
  templateUrl: './trash-list.component.html',
  styleUrls: ['./trash-list.component.scss'],
})
export class TrashListComponent implements OnInit{
  @Input()project: Project;
  public icons = trashIcons;
  constructor(private modalCtrl: ModalController) { }

  async ngOnInit() {

  }

  async close() {
    await this.modalCtrl.dismiss();
  }
  public async openDeletedListModal(path: string) {
    if(this.project[path]) {
     const modal = await this.modalCtrl.create({
        component: DeletedListComponent,
        cssClass: 'modal-fullscreen',
        componentProps: {
          data: this.project[path],
          path,
          projectId: this.project.id
        }
      });
     await modal.present();
    }
  }
}
