import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TimelineListComponent} from './timeline-list/timeline-list.component';
import {Timeline} from '../../models/project/Timeline';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input()timelines:  Timeline[];
  @Input()projectId: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openTimelineModal() {
    await (await this.modalCtrl.create({
      component: TimelineListComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {timelines: this.timelines, projectId: this.projectId}
    })).present();
  }
}
