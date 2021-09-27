import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TrashListComponent} from './trash-list/trash-list.component';
import {Project} from '../../models/project/Project';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {
  @Input()project: Project;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async presentTrashListModal() {
    const modal = await this.modalCtrl.create({
      component: TrashListComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { project: this.project}
    });
    await modal.present();
  }
}
