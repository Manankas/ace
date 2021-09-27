import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {WLocationCardComponent} from './wLocation-card.component';
import {WLocationFormModule} from '../wLocation-form/wLocation-form.module';
import {CardSliderCptModule} from '../../card-slider/card-slider.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        WLocationFormModule,
        CardSliderCptModule,
    ],
  declarations: [WLocationCardComponent],
  exports: [WLocationCardComponent],
})
export class WLocationCardModule {

}
