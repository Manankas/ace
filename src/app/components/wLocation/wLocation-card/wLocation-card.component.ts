import { Component, Input } from '@angular/core';
import { WLocation } from '../../../models/project/WLocation';
import { ModalController } from '@ionic/angular';
import { WLocationDetailsComponent } from '../wLocation-details/wLocation-details.component';
import { WLocationFormComponent } from '../wLocation-form/wLocation-form.component';

@Component({
  selector: 'app-wlocation-card',
  templateUrl: './wLocation-card.component.html',
  styleUrls: ['./wLocation-card.component.scss'],
})
export class WLocationCardComponent {
  @Input() title: string;
  @Input()wLocations: WLocation[];
  @Input()parentId = 0;
  @Input()projectId: string;
  @Input()loading: boolean;
  constructor(private modalCtrl: ModalController) {}

  public async showLocationDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: WLocationDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        wLocations: this.wLocations,
        selectedWLocation: this.wLocations[index],
        projectId: this.projectId
      },
    });
    await modal.present();
  }
  public async openAddLocationForm() {
    const modal = await this.modalCtrl.create({
      component: WLocationFormComponent,
      componentProps: {
        parentId: this.parentId,
        projectId: this.projectId
      },
      cssClass: 'modal-fullscreen'
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.wLocation) this.wLocations.unshift(data.wLocation);
    });
    await modal.present();
  }
}
