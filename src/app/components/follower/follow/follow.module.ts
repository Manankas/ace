import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

import { IonicModule } from '@ionic/angular';

import { FollowComponent } from './follow.component';
import {TranslateModule} from '@ngx-translate/core';
import {UserChallengesModule} from '../../challenge/user-challenges/user-challenges.module';
import {ChatFormModule} from '../../chat/chat-form/chat-form.module';

@NgModule({
    imports: [CommonModule, IonicModule, MatMenuModule, ChatFormModule, TranslateModule, UserChallengesModule],
  declarations: [FollowComponent],
  exports: [FollowComponent],
})
export class FollowCptModule {}
