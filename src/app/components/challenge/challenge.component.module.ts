import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { IonicModule } from '@ionic/angular';

import { ChallengeAddFormCptModule } from './challenge-form/challenge-form.module';
import { ChallengeDetailsComponentModule } from './challenge-details/challenge-details.module';
import { ChallengeComponent } from './challenge.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatRippleModule,
        ChallengeDetailsComponentModule,
        MatButtonModule,
        ChallengeAddFormCptModule,
        TranslateModule,
    ],
  declarations: [ChallengeComponent],
  exports: [ChallengeComponent],
})
export class ChallengeComponentModule {}
