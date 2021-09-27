import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SpeciesListComponent} from './species-list/species-list.component';
import {Species} from '../../models/project/Species';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements OnInit {
  @Input()projectId: string;
  @Input()species: Species[];
  constructor(private modalController: ModalController) {
  }
  ngOnInit() {}

  async presentSpeciesListModal() {
    const modal = await this.modalController.create({
      component: SpeciesListComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        projectId: this.projectId,
        species: this.species
      }
    });
    return await modal.present();
  }

}
