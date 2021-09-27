import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { AvatarGeneratorService } from 'src/app/services/avatar-generator/avatar-generator.service';
import { AvatarValues } from 'src/app/services/avatar-generator/avatar-generator.type';

import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Character } from '../../../models/project/Character';
import { LoadingService } from '../../../services/loading.service';
import { ProjectService } from '../../../services/project.service';
import { ToastService } from '../../../services/toast.service';
import { getKeys } from '../../../utils/utils';
import { CharacterUpdateFormComponent } from '../character-update-form/character-update-form.component';
import { characterCategories, characterIcons } from '../characterData';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss'],
})
export class CharacterInfoComponent implements OnInit {
  @Input() projectId: string;
  @Input() character: Character;
  public getKeys = getKeys;
  public categoryKeys = characterCategories;
  public icons = characterIcons;
  public isEntered = false;
  public avatarSvg: SafeHtml;

  constructor(
    private modalController: ModalController,
    private projectService: ProjectService,
    private loading: LoadingService,
    private $toast: ToastService,
    private translate: TranslateService,
    private avatarGeneratorService: AvatarGeneratorService
  ) {}

  ngOnInit() {
    this.avatarToSvg(this.character.avatarGenerator);
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }

  ionViewWillEnter() {
    this.isEntered = true;
  }
  async presentUpdateModal() {
    const modal = await this.modalController.create({
      component: CharacterUpdateFormComponent,
      componentProps: { character: this.character, projectId: this.projectId },
      cssClass: 'modal-fullscreen',
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if (data?.newCharacter) {
        await this.loading.start(
          data.newCharacter.archived
            ? this.translate.instant('delete.loading')
            : this.translate.instant('update.loading')
        );
        const { images, avatar, ...res } = data.newCharacter;
        this.projectService
          .updateMap(this.projectId, 'characters', res)
          .then(async () => {
            await this.$toast.presentToast(
              data.newCharacter.archived
                ? this.translate.instant('delete.success')
                : this.translate.instant('update.success')
            );
            Object.assign<Character, Character>(
              this.character,
              data.newCharacter
            );
            await this.close();
          })
          .finally(async () => {
            await this.loading.stop();
          });
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
