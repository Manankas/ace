import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Species} from '../../../models/project/Species';
import {SpeciesFormComponent} from '../species-form/species-form.component';
import {ToastService} from '../../../services/toast.service';
import {SpeciesDetailsComponent} from '../species-details/species-details.component';
import {ProjectService} from '../../../services/project.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss'],
})
export class SpeciesListComponent implements OnInit {
  @Input()projectId: string;
  @Input()species: Species[];
  constructor(
    private modalCtrl: ModalController,
    private projectService: ProjectService,
    private $toast: ToastService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  async presentFormModal() {
    const modal = await this.modalCtrl.create({
      component: SpeciesFormComponent,
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(({ data }) => {
      if(data?.species) {
       this.projectService
         .updateMap(this.projectId, 'species', data.species)
         .then(() => { this.species.unshift(data.species); })
         .catch(() => { this.$toast.presentToast(this.translate.instant('species.add.failure'), 'warning'); })
      }
    })
    await modal.present();
  }

  public async openSpeciesDetails(index: number) {
    const modal = await this.modalCtrl.create({
      component: SpeciesDetailsComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {  species: this.species[index], projectId: this.projectId }
    });
    await modal.present();
  }
}
