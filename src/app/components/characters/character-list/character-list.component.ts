import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { AvatarGeneratorService } from 'src/app/services/avatar-generator/avatar-generator.service';
import { AvatarValues } from 'src/app/services/avatar-generator/avatar-generator.type';

import { ModalController } from '@ionic/angular';

import { Character } from '../../../models/project/Character';
import { CharacterInfoComponent } from '../character-info/character-info.component';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  @Input() projectId: string;
  @Input() characters: Character[];

  constructor(
    public modalController: ModalController,
    private avatarGeneratorService: AvatarGeneratorService
  ) {}

  ngOnInit() {}

  async infoCharacterModal(index: number) {
    const modal = await this.modalController.create({
      component: CharacterInfoComponent,
      componentProps: {
        character: this.characters[index],
        projectId: this.projectId,
      },
      cssClass: 'modal-fullscreen',
    });
    return await modal.present();
  }

  public avatarToSvg(avatarValues: AvatarValues): SafeHtml {
    return this.avatarGeneratorService.createAvatarSvg(
      this.avatarGeneratorService.createAvatarOption(avatarValues)
    );
  }
}
