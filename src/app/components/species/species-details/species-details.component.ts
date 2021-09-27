import {Component, Input, OnInit} from '@angular/core';
import {Species} from '../../../models/project/Species';
import {ModalController} from '@ionic/angular';
import {getKeys} from '../../../utils/utils';
import {SpeciesEditionComponent} from '../species-edition/species-edition.component';
import {speciesCategories, speciesIcons} from '../speciesData';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.scss'],
})
export class SpeciesDetailsComponent implements OnInit {
  @Input()projectId: string;
  @Input()species: Species;
  public getKeys = getKeys;
  public categoryKeys = speciesCategories;
  public icons =  speciesIcons
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
      component: SpeciesEditionComponent,
      componentProps: { species: this.species, projectId: this.projectId },
      cssClass: 'modal-fullscreen'
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.newSpecies) {
        await this.loading.start(
          data.newSpecies.archived ?
            this.translate.instant('delete.loading') :
            this.translate.instant('update.loading')
        );
        const { avatar, images, ...res} = data.newSpecies;
        this.projectService.updateMap(this.projectId, 'species', res)
          .then(async () => {
            await this.$toast.presentToast(
              data.newSpecies.archived ?
                this.translate.instant('delete.success') :
                this.translate.instant('update.success')
            );
            Object.assign<Species, Species>(this.species, data.newSpecies);
            await this.close()
          })
          .finally(async () => { await this.loading.stop(); });
      }
    })
    return modal.present();
  }
}
