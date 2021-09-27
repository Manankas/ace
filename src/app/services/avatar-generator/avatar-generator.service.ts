import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';

import {
  avatarValues as avatarVals,
  setCreateAvatarOption,
} from './avatar-generator.constant';
import { AvatarValues, CreateAvatarOption } from './avatar-generator.type';

@Injectable({
  providedIn: 'root',
})
export class AvatarGeneratorService {
  constructor(private sanitizer: DomSanitizer) {}

  public createAvatarOption(avatarValues?: AvatarValues) {
    return setCreateAvatarOption(avatarValues || avatarVals);
  }

  public createAvatarSvg(createAvatarOption: CreateAvatarOption) {
    return this.sanitizer.bypassSecurityTrustHtml(
      createAvatar(style, { seed: 'custom-seed', ...createAvatarOption })
    );
  }
}
