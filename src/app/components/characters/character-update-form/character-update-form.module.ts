import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AvatarGeneratorCptModule } from '../../avatar-generator/avatar-generator.module';
import { ImageModalCptModule } from '../../image-modal/project-cover.module.ts';
import { AutogrowTextareaModule } from '../../shared/autogrow-textarea/autogrow-textarea.module';
import { CustomFieldModule } from '../../shared/custom-field/custom-field.module';
import { CharacterUpdateFormComponent } from './character-update-form.component';

@NgModule({
  declarations: [CharacterUpdateFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AutogrowTextareaModule,
    MaterialModule,
    TranslateModule,
    ImageModalCptModule,
    CustomFieldModule,
    AvatarGeneratorCptModule,
  ],
  exports: [CharacterUpdateFormComponent],
})
export class CharacterUpdateFormCptModule {}
