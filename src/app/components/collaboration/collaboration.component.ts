import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CollaborationTabsComponent} from './collaboration-tabs/collaboration-tabs.component';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.scss'],
})
export class CollaborationComponent implements OnInit {
  @Input()projectId: string;
  @Input()projectOwnerId: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CollaborationTabsComponent,
      componentProps: { projectId: this.projectId,  projectOwnerId: this.projectOwnerId },
      cssClass: 'modal-fullscreen'
    });
    await modal.present();
  }
}
