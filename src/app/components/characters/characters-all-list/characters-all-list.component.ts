import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Character } from '../../../models/project/Character';
import { CharacterAddFormComponent } from '../character-add-form/character-add-form.component';

@Component({
  selector: 'app-characters-all-list',
  templateUrl: './characters-all-list.component.html',
  styleUrls: ['./characters-all-list.component.scss'],
})
export class CharactersAllListComponent implements OnInit {
  @Input() characters: Character[];
  @Input() projectId: string;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }

  async addCharacterModal() {
    const modal = await this.modalController.create({
      component: CharacterAddFormComponent,
      componentProps: { projectId: this.projectId },
      cssClass: 'modal-fullscreen',
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data.character) this.characters.unshift(data.character);
    });
    return await modal.present();
  }
}
