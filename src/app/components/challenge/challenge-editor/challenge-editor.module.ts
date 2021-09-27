import { NgModule } from '@angular/core';

import { WysiwygCptModule } from '../../shared/wysiwyg/wysiwyg.module';
import { ChallengeEditorComponent } from './challenge-editor.component';
import {ChallengeSubmissionModule} from './challenge-submission/challenge-submission.module';
import {ChallengeInfoModule} from '../challenge-info/challenge-info.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [WysiwygCptModule, ChallengeSubmissionModule, MatBottomSheetModule, ChallengeInfoModule, TranslateModule],
  declarations: [ChallengeEditorComponent],
  exports: [ChallengeEditorComponent],
})
export class ChallengeEditorCptModule {}
