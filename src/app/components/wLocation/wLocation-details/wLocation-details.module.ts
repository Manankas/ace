import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {WLocationDetailsComponent} from './wLocation-details.component';
import {WLocationEditionModule} from '../wLocation-edition/wLocation-edition.module';
import {WLocationCardModule} from '../wLocation-card/wLocation-card.module';
import {CardAvatarCptModule} from '../../card-avatar/card-avatar.module';
import {CardSliderCptModule} from '../../card-slider/card-slider.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';
import {ImageSliderCptModule} from '../../image-slider/image-slider.module';
import {MatIconModule} from '@angular/material/icon';
import {SharedTreeModule} from '../../shared/shared-tree/shared-tree.module';
import {MatButtonModule} from '@angular/material/button';
import {CustomFieldListModule} from '../../shared/custom-field/custom-field-list/custom-field-list.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        WLocationEditionModule,
        WLocationCardModule,
        CardAvatarCptModule,
        CardSliderCptModule,
        MatExpansionModule,
        TranslateModule,
        ImageSliderCptModule,
        MatIconModule,
        SharedTreeModule,
        MatButtonModule,
        CustomFieldListModule
    ],
  declarations: [WLocationDetailsComponent],
  exports: [WLocationDetailsComponent],
})
export class WLocationDetailsModule {}
