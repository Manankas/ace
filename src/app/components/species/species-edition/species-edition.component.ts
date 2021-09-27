import {Component, Input, OnInit} from '@angular/core';
import {Species} from '../../../models/project/Species';
import {getKeys} from '../../../utils/utils';
import {AlertController, ModalController} from '@ionic/angular';
import {ToastService} from '../../../services/toast.service';
import {cloneDeep} from 'lodash';
import {ImageModalComponent} from '../../image-modal/image-modal.component';
import {speciesCategories, speciesIcons} from '../speciesData';
import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-species-edition',
  templateUrl: './species-edition.component.html',
  styleUrls: ['./species-edition.component.scss'],
})
export class SpeciesEditionComponent implements OnInit {
  @Input()projectId: string;
  @Input()species: Species;
  public speciesClone: Species;
  public getKeys = getKeys;
  public categoryKeys = speciesCategories;
  public icons =  speciesIcons
  constructor(
    public modalController: ModalController,
    private $toast: ToastService,
    private projectService: ProjectService,
    private translate: TranslateService,
    private $alert: AlertController,
  ) { }

  ngOnInit() {
    this.speciesClone = cloneDeep(this.species);
  }
  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  async updateSpecies() {
    await this.modalController.dismiss({
      newSpecies: this.speciesClone
    });
  }

  async openImageModal() {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if(data.image.url) {
        this.speciesClone.avatar =  data.image.url;
        this.species.avatar =  data.image.url;
        await this.projectService.updateMap(
          this.projectId,
          'species',
          {id: this.species.id, avatar: data.image.name}
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
            Object.assign(this.speciesClone, { archived: true });
            await this.updateSpecies();
          }
        }
      ]
    });
    await alert.present();
  }
}
