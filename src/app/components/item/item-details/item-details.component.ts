import {Component, Input, OnInit} from '@angular/core';
import {ItemEditionComponent} from '../item-edition/item-edition.component';
import {ModalController} from '@ionic/angular';
import {Item} from '../../../models/project/Item';
import {getKeys} from '../../../utils/utils';
import {itemCategories, itemIcons} from '../itemData';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  @Input()projectId: string;
  @Input()item: Item;
  public getKeys = getKeys;
  public categoryKeys = itemCategories;
  public icons = itemIcons
  public isEntered = false;
  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private $toast: ToastService,
    private projectService: ProjectService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.isEntered = true;
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  async presentEditionModal() {
    const modal = await this.modalCtrl.create({
      component: ItemEditionComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { item: this.item, projectId: this.projectId }
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.newItem) {
        await this.loading.start(
          data.newItem.archived ?
            this.translate.instant('delete.loading') :
            this.translate.instant('update.loading')
        );
        const { avatar, images, ...res} = data.newItem;
        this.projectService.updateMap(this.projectId, 'items', res)
          .then(async () => {
            await this.$toast.presentToast(
              data.newItem.archived ?
                this.translate.instant('delete.success') :
                this.translate.instant('update.success')
            );
            Object.assign<Item, Item>(this.item, data.newItem);
            await this.close()
          })
          .finally(async () => { await this.loading.stop(); });
      }
    })
    return modal.present();
  }

}
