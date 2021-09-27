import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ItemListComponent} from './item-list/item-list.component';
import {Item} from '../../models/project/Item';

@Component({
  selector: 'app-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input()projectId: string;
  @Input()items: Item[]
  constructor(private modalController: ModalController) {
  }
  ngOnInit() {}

  async presentItemsListModal() {
    const modal = await this.modalController.create({
      component: ItemListComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        projectId: this.projectId,
        items: this.items
      }
    });
    return await modal.present();
  }

}
