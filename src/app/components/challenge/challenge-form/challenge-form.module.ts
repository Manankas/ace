import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { CardAvatarCptModule } from '../../card-avatar/card-avatar.module';
import { AutogrowTextareaModule } from '../../shared/autogrow-textarea/autogrow-textarea.module';
import { ChallengeEditorCptModule } from '../challenge-editor/challenge-editor.module';
import { ChallengeFormComponent } from './challenge-form.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ChallengeEditorCptModule,
    MaterialModule,
    AutogrowTextareaModule,
    CardAvatarCptModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
  ],
  declarations: [ChallengeFormComponent],
  exports: [ChallengeFormComponent],
})
export class ChallengeAddFormCptModule {}
