import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ItemDetailsComponent} from './item-details.component';
import {ItemEditionModule} from '../item-edition/item-edition.module';
import {ImageSliderCptModule} from '../../image-slider/image-slider.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';
import {CustomFieldListModule} from '../../shared/custom-field/custom-field-list/custom-field-list.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ItemEditionModule,
        ImageSliderCptModule,
        MatExpansionModule,
        TranslateModule,
        CustomFieldListModule
    ],
  declarations: [ItemDetailsComponent],
  exports: [ItemDetailsComponent],
})
export class ItemDetailsModule {

}
