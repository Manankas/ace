import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import {Chapter} from '../../models/project/Chapter';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit {
  @Input()projectId: string;
  @Input()chapters: Chapter[];
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async presentSessionsListModal() {
    const modal = await this.modalController.create({
      component: SessionsListComponent,
      componentProps: { projectId: this.projectId, chapters: this.chapters },
      cssClass: 'modal-fullscreen'
    });
    return await modal.present();
  }
}
