import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserChallengesModule } from '../../components/challenge/user-challenges/user-challenges.module';
import { FollowersModule } from '../../components/follower/followers/followers.module';
import { ProfilPageRoutingModule } from './profil-routing.module';
import { ProfilPage } from './profil.page';
import {AchievementItemCptModule} from '../../components/achievements/achievement-item.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilPageRoutingModule,
        RouterModule,
        UserChallengesModule,
        FollowersModule,
        AchievementItemCptModule,
        TranslateModule,
    ],
  declarations: [ProfilPage],
})
export class ProfilPageModule {}
