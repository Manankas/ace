import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../models/project/Project';
import {ModalController} from '@ionic/angular';
import {StartGraphicsComponent} from './start-graphics/start-graphics.component';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  @Input()project: Project
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }
 async openGraphicsModal() {
    const modal = await this.modalCtrl.create({
      component: StartGraphicsComponent,
      componentProps: { project: this.project },
      cssClass: 'modal-fullscreen'
    });
    await modal.present();
 }
}
