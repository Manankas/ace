import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {WLocation} from '../../../models/project/WLocation';
import {WLocationDetailsComponent} from '../wLocation-details/wLocation-details.component';
import {SharedTreeComponent} from '../../shared/shared-tree/shared-tree.component';
import {WLocationFormComponent} from '../wLocation-form/wLocation-form.component';

@Component({
  selector: 'app-all-w-locations',
  templateUrl: './all-wLocations.component.html',
  styleUrls: ['./all-wLocations.component.scss'],
})
export class AllWLocationsComponent implements OnInit {
  @Input()wLocations: WLocation[];
  @Input()projectId: string;

  constructor(private modalCtrl: ModalController) {}
  ngOnInit() {}

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  async wLocationAddFormModal() {
    const modal = await this.modalCtrl.create({
      component: WLocationFormComponent,
      componentProps: { projectId: this.projectId },
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(({ data }) => {
      if(data?.wLocation) this.wLocations.unshift(data.wLocation)
    })
    await modal.present();
  }

  async openWLocationDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: WLocationDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        wLocations: this.wLocations,
        selectedWLocation: this.wLocations[index],
        projectId: this.projectId
      }
    });
    await modal.present();
  }

  async openWLocationTree() {
    const modal = await this.modalCtrl.create({
      component: SharedTreeComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {data: this.wLocations}
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.node && data.node.id !== 0)
        await this.openWLocationDetails(this.wLocations.findIndex(l => l.id === data.node.id));
    })
    await modal.present();
  };
}
