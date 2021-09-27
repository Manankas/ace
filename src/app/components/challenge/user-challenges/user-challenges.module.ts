import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {UserChallengesComponent} from './user-challenges.component';
import {ParticipationDetailsModule} from '../participation-details/participation-details.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ParticipationDetailsModule,
        TranslateModule
    ],
  declarations: [UserChallengesComponent],
  exports: [UserChallengesComponent],
})
export class UserChallengesModule {}
