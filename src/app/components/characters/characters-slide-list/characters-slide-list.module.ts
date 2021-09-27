import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';

import { CardSliderCptModule } from '../../card-slider/card-slider.module';
import { CharacterAddFormCptModule } from '../character-add-form/character-add-form.module';
import { CharacterInfoCptModule } from '../character-info/character-info.module';
import { CharactersSlideListComponent } from './characters-slide-list.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CharactersSlideListComponent],
    imports: [
        CommonModule,
        IonicModule,
        MaterialModule,
        CharacterAddFormCptModule,
        CharacterInfoCptModule,
        CardSliderCptModule,
        TranslateModule,
    ],
  exports: [CharactersSlideListComponent],
})
export class CharactersSlideListCptModule {}
