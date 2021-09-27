import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

import { cloneDeep } from 'lodash';
import { AvatarGeneratorService } from 'src/app/services/avatar-generator/avatar-generator.service';
import { AvatarValues } from 'src/app/services/avatar-generator/avatar-generator.type';

import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Character } from '../../../models/project/Character';
import { ProjectService } from '../../../services/project.service';
import { getKeys } from '../../../utils/utils';
import { AvatarGeneratorComponent } from '../../avatar-generator/avatar-generator.component';
import { ImageModalComponent } from '../../image-modal/image-modal.component';
import { characterCategories, characterIcons } from '../characterData';

@Component({
  selector: 'app-character-update-form',
  templateUrl: './character-update-form.component.html',
  styleUrls: ['./character-update-form.component.scss'],
})
export class CharacterUpdateFormComponent implements OnInit {
  @Input() projectId: string;
  @Input() character: Character;
  public characterClone: Character = null;
  public getKeys = getKeys;
  public categoryKeys = characterCategories;
  public icons = characterIcons;
  public moreFormGroup: FormGroup;
  public avatarSvg: SafeHtml;
  constructor(
    private modalController: ModalController,
    private projectService: ProjectService,
    private translate: TranslateService,
    private $alert: AlertController,
    private avatarGeneratorService: AvatarGeneratorService
  ) {}

  ngOnInit() {
    this.characterClone = cloneDeep(this.character);
    // if(this.characterClone.avatarGenerator)
    this.avatarToSvg(this.characterClone.avatarGenerator);
    this.moreFormGroup = new FormGroup({
      notesCtrl: new FormControl('', [Validators.maxLength(300)]),
    });
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  async updateCharacter() {
    this.character.avatarGenerator = cloneDeep(
      this.characterClone.avatarGenerator
    );
    this.projectService
      .updateMap(this.projectId, 'characters', {
        id: this.character.id,
        avatarGenerator: this.character.avatarGenerator,
      })
      .then(() => this.translate.instant('update.success'));
    await this.modalController.dismiss({
      newCharacter: this.characterClone,
    });
  }

  async openImageModal() {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      cssClass: 'modal-fullscreen',
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if (data.image.url) {
        this.characterClone.avatar = data.image.url;
        this.characterClone.avatarGenerator = null;
        this.character.avatar = data.image.url;
        this.character.avatarGenerator = null;
        this.avatarToSvg(this.characterClone.avatarGenerator);
        this.projectService
          .updateMap(this.projectId, 'characters', {
            id: this.character.id,
            avatar: data.image.name,
          })
          .then(() => this.translate.instant('update.success'));
      }
    });
    return await modal.present();
  }

  public async deleteConfirm() {
    const alert = await this.$alert.create({
      subHeader: this.translate.instant('trash.delete.header'),
      message: this.translate.instant('trash.delete.message'),
      buttons: [
        {
          text: this.translate.instant('trash.buttons.keep'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('trash.buttons.softDelete'),
          handler: async () => {
            Object.assign(this.characterClone, { archived: true });
            await this.updateCharacter();
          },
        },
      ],
    });
    await alert.present();
  }

  async openAvatarGenerator() {
    const modal = await this.modalController.create({
      component: AvatarGeneratorComponent,
      cssClass: 'modal-fullscreen',
    });

    modal.onWillDismiss().then(async ({ data: { avatarGenerator } }) => {
      if (avatarGenerator) {
        this.characterClone.avatarGenerator = avatarGenerator;
        this.avatarToSvg(this.characterClone.avatarGenerator);
      }
    });

    return modal.present();
  }

  private avatarToSvg(avatarValues: AvatarValues) {
    this.avatarSvg = this.avatarGeneratorService.createAvatarSvg(
      this.avatarGeneratorService.createAvatarOption(avatarValues)
    );
  }
}
