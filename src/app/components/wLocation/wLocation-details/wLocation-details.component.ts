import {Component, Input, OnInit} from '@angular/core';
import {WLocation} from '../../../models/project/WLocation';
import {AlertController, ModalController} from '@ionic/angular';
import {getKeys} from '../../../utils/utils';
import {wLocationCategoryKey, wLocationIcons} from '../wLocationData';
import {WLocationEditionComponent} from '../wLocation-edition/wLocation-edition.component';
import {SharedTreeComponent} from '../../shared/shared-tree/shared-tree.component';
import {ToastService} from '../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {LoadingService} from '../../../services/loading.service';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-wlocation-details',
  templateUrl: './wLocation-details.component.html',
  styleUrls: ['./wLocation-details.component.scss'],
})
export class WLocationDetailsComponent implements OnInit {
  @Input()projectId: string;
  @Input()wLocations: WLocation[];
  @Input()selectedWLocation: WLocation;
  public getKeys = getKeys;
  public categoryKeys = wLocationCategoryKey
  public icons = wLocationIcons;
  public isEntered = false;

  constructor(
    private modalCtrl: ModalController,
    private projectService: ProjectService,
    private loading: LoadingService,
    private $alert: AlertController,
    private $toast: ToastService,
    private translate: TranslateService
  ) {}
  ngOnInit() {}

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  ionViewWillEnter() {
    this.isEntered = true;
  }

  public async openEditionModal() {
    const modal = await this.modalCtrl.create({
      component: WLocationEditionComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {selectedWLocation: this.selectedWLocation, projectId: this.projectId},
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.newLocation) {
        await this.loading.start(
          data.newLocation.archived ?
            this.translate.instant('delete.loading') :
            this.translate.instant('update.loading')
        );
        const { avatar,images, ...res} = data.newLocation;
        this.projectService.updateMap(this.projectId, 'wLocations', res)
          .then(async () => {
            await this.$toast.presentToast(this.translate.instant('update.success'));
            Object.assign<WLocation, WLocation>(this.selectedWLocation, data.newLocation);
            if(this.selectedWLocation.archived)
              await this.close();
          })
          .finally(async () => { await this.loading.stop(); });
      }
    })
    await modal.present();
  }

  /**Moving group*/
  async openLocationsTreeModal() {
    const modal = await this.modalCtrl.create({
      component: SharedTreeComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        data: this.wLocations,
        title: this.translate.instant('moveTo.title')
      }
    });
    modal.onDidDismiss().then(async ({data}) =>{
      if(data?.node) {
        if(this.selectedWLocation.id !== data.node.id) {
          this.selectedWLocation.parentId = data.node.id;
          const { avatar, images, ...res } = this.selectedWLocation;
          this.projectService
            .updateMap(this.projectId, 'wLocations', res)
            .then(async () => {
            const p = data.node?.general ? data.node.general.name : data.node.name;
            await this.$toast.presentToast(this.selectedWLocation.general.name + ' -> ' + p);
          });
        } else {
          await this.$toast.presentToast(this.translate.instant('moveTo.errorMessage'), 'warning');
        }
      }
    })
    await modal.present();
  }
}
