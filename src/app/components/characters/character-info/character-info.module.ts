import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ImageSliderCptModule } from '../../image-slider/image-slider.module';
import { AutogrowTextareaModule } from '../../shared/autogrow-textarea/autogrow-textarea.module';
import { CustomFieldListModule } from '../../shared/custom-field/custom-field-list/custom-field-list.module';
import { CharacterUpdateFormCptModule } from '../character-update-form/character-update-form.module';
import { CharacterInfoComponent } from './character-info.component';

@NgModule({
  declarations: [CharacterInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    ImageSliderCptModule,
    CharacterUpdateFormCptModule,
    TranslateModule,
    AutogrowTextareaModule,
    CustomFieldListModule,
  ],
  exports: [CharacterInfoComponent],
})
export class CharacterInfoCptModule {}
