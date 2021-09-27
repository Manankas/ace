import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

import { IonicModule } from '@ionic/angular';
import { ParticipationDetailsComponent } from './participation-details.component';
import {ChallengeEditorCptModule} from '../challenge-editor/challenge-editor.module';
import {TranslateModule} from '@ngx-translate/core';
import {FooterInputModule} from '../../shared/footer-input/footer-input.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatRippleModule,
        IonicHeaderParallaxModule,
        MatMenuModule,
        ChallengeEditorCptModule,
        TranslateModule,
        FooterInputModule,
        MatButtonModule
    ],
  declarations: [ParticipationDetailsComponent],
  exports: [ParticipationDetailsComponent],
})
export class ParticipationDetailsModule {}
