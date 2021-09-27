import { NgModule } from '@angular/core';
import {ChallengeSubmissionComponent} from './challenge-submission.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ChallengeSubmissionComponent],
  exports: [ChallengeSubmissionComponent],
    imports: [
        IonicModule,
        FormsModule,
        TranslateModule
    ]
})
export class ChallengeSubmissionModule {}
