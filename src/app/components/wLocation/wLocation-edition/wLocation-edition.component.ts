import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {ImageModalComponent} from '../../image-modal/image-modal.component';
import {wLocationCategoryKey, wLocationIcons} from '../wLocationData';
import {getKeys} from '../../../utils/utils';
import {WLocation} from '../../../models/project/WLocation';
import {TranslateService} from '@ngx-translate/core';
import {cloneDeep} from 'lodash';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-location-edition',
  templateUrl: './wLocation-edition.component.html',
  styleUrls: ['./wLocation-edition.component.scss'],
})
export class WLocationEditionComponent implements OnInit{
  @Input()projectId: string;
  @Input()selectedWLocation: WLocation;
  public wLocationClone: WLocation;
  public getKeys = getKeys;
  public categoryKeys = wLocationCategoryKey
  public icons = wLocationIcons;
  constructor(
    public modalController: ModalController,
    private projectService: ProjectService,
    private $alert: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.wLocationClone = cloneDeep(this.selectedWLocation);
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }

  async updateWLocation() {
    await this.modalController.dismiss({
      newLocation: this.wLocationClone
    })
  }

  async openImageModal() {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      cssClass: 'modal-fullscreen'
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data.image.url) {
        this.wLocationClone.avatar =  data.image.url;
        this.selectedWLocation.avatar =  data.image.url;
        this.projectService.updateMap(
          this.projectId, 'wLocations',
          {id: this.wLocationClone.id, avatar: data.image.name}
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
            Object.assign(this.wLocationClone, { archived: true });
            await this.updateWLocation();
          }
        }
      ]
    });
    await alert.present();
  }
}
