import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SpeciesDetailsComponent} from './species-details.component';
import {SpeciesEditionModule} from '../species-edition/species-edition.module';
import {ImageSliderCptModule} from '../../image-slider/image-slider.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';
import {CustomFieldListModule} from '../../shared/custom-field/custom-field-list/custom-field-list.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SpeciesEditionModule,
        ImageSliderCptModule,
        MatExpansionModule,
        TranslateModule,
        CustomFieldListModule,
        MatIconModule
    ],
  declarations: [SpeciesDetailsComponent],
  exports: [SpeciesDetailsComponent],
})
export class SpeciesDetailsModule {

}
