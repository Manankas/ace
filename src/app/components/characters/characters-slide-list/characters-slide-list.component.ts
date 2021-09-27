import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Character } from '../../../models/project/Character';
import { CharacterAddFormComponent } from '../character-add-form/character-add-form.component';
import { CharacterInfoComponent } from '../character-info/character-info.component';
import { CharactersAllListComponent } from '../characters-all-list/characters-all-list.component';

@Component({
  selector: 'app-characters-slide-list',
  templateUrl: './characters-slide-list.component.html',
  styleUrls: ['./characters-slide-list.component.scss'],
})
export class CharactersSlideListComponent implements OnInit {
  @Input() projectId: string;
  @Input() characters: Character[];
  @Input() loading = false;
  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    centredSlides: false,
    slidesPerView: 3.8,
  };
  constructor(private modalController: ModalController) {}

  async ngOnInit() {}

  async addCharacterModal() {
    const modal = await this.modalController.create({
      component: CharacterAddFormComponent,
      componentProps: { projectId: this.projectId },
      cssClass: 'modal-fullscreen',
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data?.character) this.characters.unshift(data.character);
    });
    return await modal.present();
  }

  async infoCharacterModal(index: number) {
    const modal = await this.modalController.create({
      component: CharacterInfoComponent,
      componentProps: { character: this.characters[index], projectId: this.projectId},
      cssClass: 'modal-fullscreen',
    });
    return await modal.present();
  }

  async presentCharactersModal() {
    const modal = await this.modalController.create({
      component: CharactersAllListComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        characters: this.characters,
        projectId: this.projectId,
      },
    });
    return await modal.present();
  }
}
