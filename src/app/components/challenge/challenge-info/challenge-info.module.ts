import { NgModule } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ChallengeInfoComponent} from './challenge-info.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [IonicModule, MatCardModule, MatButtonModule, TranslateModule],
  declarations: [ChallengeInfoComponent],
  exports: [ChallengeInfoComponent],
})
export class ChallengeInfoModule {}
