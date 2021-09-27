import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import {
  avatarOptions,
  avatarValues,
} from 'src/app/services/avatar-generator/avatar-generator.constant';
import { AvatarGeneratorService } from 'src/app/services/avatar-generator/avatar-generator.service';
import {
  AvatarOptions,
  AvatarValues,
  CreateAvatarOption,
} from 'src/app/services/avatar-generator/avatar-generator.type';
import { getKeys } from 'src/app/utils/utils';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-avatar-generator',
  templateUrl: './avatar-generator.component.html',
  styleUrls: ['./avatar-generator.component.scss'],
})
export class AvatarGeneratorComponent implements OnInit {
  public createAvatarOption: CreateAvatarOption;
  public svg: SafeHtml;

  public getKeys = getKeys;
  @Input() avatarValues: AvatarValues = avatarValues;
  public avatarOptions: AvatarOptions = avatarOptions;
  public avatarItems: any;

  constructor(
    private modalCtrl: ModalController,
    private avatarGeneratorService: AvatarGeneratorService
  ) {}

  ngOnInit() {
    this.createAvatarOption = this.avatarGeneratorService.createAvatarOption(
      this.avatarValues
    );

    this.svg = this.avatarGeneratorService.createAvatarSvg(
      this.createAvatarOption
    );

    this.avatarItems = Object.keys(this.avatarOptions).map((key, idex) => ({
      [key]: avatarOptions[key],
    }));
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true,
      avatarGenerator: this.avatarValues,
    });
  }

  onSelectChange(item, option) {
    console.log(item, option);
    if (item === 'style') {
      this.createAvatarOption.style =
        this.avatarOptions.style[option.detail.value];
    } else
      this.createAvatarOption[item] = [
        this.avatarOptions[item][option.detail.value],
      ];

    this.svg = this.avatarGeneratorService.createAvatarSvg(
      this.createAvatarOption
    );

    // save avatar option with this.avatarValues and set it forward in setCreateAvatar()
    this.avatarValues[item] = option.detail.value;
  }
}
