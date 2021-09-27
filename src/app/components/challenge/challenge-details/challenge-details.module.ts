import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { IonicModule } from '@ionic/angular';
import { ChallengeEditorCptModule } from '../challenge-editor/challenge-editor.module';
import { ParticipationDetailsModule } from '../participation-details/participation-details.module';
import { ChallengeDetailsComponent } from './challenge-details.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatRippleModule,
        IonicHeaderParallaxModule,
        ParticipationDetailsModule,
        ChallengeEditorCptModule,
        TranslateModule,
    ],
  declarations: [ChallengeDetailsComponent],
  exports: [ChallengeDetailsComponent],
})
export class ChallengeDetailsComponentModule {}
