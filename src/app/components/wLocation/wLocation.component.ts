import {Component, Input, OnInit} from '@angular/core';
import { WLocation } from '../../models/project/WLocation';
import {ModalController} from '@ionic/angular';
import {AllWLocationsComponent} from './all-wLocations/all-wLocations.component';

@Component({
  selector: 'app-wlocation',
  templateUrl: './wLocation.component.html',
  styleUrls: ['./wLocation.component.scss'],
})
export class WLocationComponent implements OnInit {
  @Input()projectId: string;
  @Input()wLocations: WLocation[];
  @Input()loading: boolean;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }
  public async openAllWLocationsModal() {
    const modal = await this.modalCtrl.create({
      component: AllWLocationsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { wLocations: this.wLocations, projectId: this.projectId }
    });
    await modal.present();
  }
}
