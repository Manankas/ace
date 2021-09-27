import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ItemFormComponent} from '../item-form/item-form.component';
import {Item} from '../../../models/project/Item';
import {ToastService} from '../../../services/toast.service';
import {ItemDetailsComponent} from '../item-details/item-details.component';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input()projectId: string;
  @Input()items: Item[];
  constructor(
    private modalController: ModalController,
    private projectService: ProjectService,
    private $toast: ToastService,
  ) { }

  async ngOnInit() {
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true })
  }

  async presentAddFormModal() {
    const modal = await this.modalController.create({
      component: ItemFormComponent,
      componentProps: { projectId: this.projectId },
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(({ data }) => {
      if(data?.item) {
        this.projectService
          .updateMap(this.projectId, 'items', data.item)
          .then((it) => { this.items.unshift(data.item); })
          .catch(() => { this.$toast.presentToast('Echec de création !', 'warning'); })
      }
    })
    await modal.present();
  }

  public async openItemDetails(index: number) {
    const modal = await this.modalController.create({
      component: ItemDetailsComponent,
      componentProps: {  item: this.items[index], projectId: this.projectId },
      cssClass: 'modal-fullscreen'
    });
    await modal.present();
  }
}
