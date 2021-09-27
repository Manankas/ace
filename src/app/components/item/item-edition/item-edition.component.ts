import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../models/project/Item';
import {AlertController, ModalController} from '@ionic/angular';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import { ImageModalComponent } from '../../image-modal/image-modal.component';
import {getKeys} from '../../../utils/utils';
import {itemCategories, itemIcons} from '../itemData';
import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-items-edition',
  templateUrl: './item-edition.component.html',
  styleUrls: ['./item-edition.component.scss'],
})
export class ItemEditionComponent implements OnInit {
  @Input()projectId: string;
  @Input()item: Item;
  public itemClone: Item;
  public getKeys = getKeys;
  public categoryKeys = itemCategories;
  public icons = itemIcons
  constructor(
    public modalController: ModalController,
    private loading: LoadingService,
    private $toast: ToastService,
    private projectService: ProjectService,
    private translate: TranslateService,
    private $alert: AlertController,
  ) { }

  ngOnInit() {
    this.itemClone = {...this.item};
  }
  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  async updateItem() {
    await this.modalController.dismiss({
      newItem: this.itemClone
    });
  }

  async openImageModal() {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if(data.image.url) {
        this.itemClone.avatar =  data.image.url;
        this.item.avatar =  data.image.url;
        this.projectService.updateMap(
          this.projectId,'items',
          {id: this.item.id, avatar: data.image.name}
        );
      }
    })
    return await modal.present();
  }
  public async deleteConfirm() {
    const alert = await this.$alert.create({
      subHeader: this.translate.instant('trash.delete.header'),
      message: this.translate.instant('trash.delete.message'),
      buttons: [
        {
          text: this.translate.instant('trash.buttons.keep'),
          role: 'cancel'
        },
        {
          text: this.translate.instant('trash.buttons.softDelete'),
          handler: async () => {
            Object.assign(this.itemClone, { archived: true });
            await this.updateItem();
          }
        }
      ]
    });
    await alert.present();
  }
}
