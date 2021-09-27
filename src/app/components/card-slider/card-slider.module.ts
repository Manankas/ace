import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarModule } from 'ngx-avatar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';

import { CardAvatarCptModule } from '../card-avatar/card-avatar.module';
import { CardSliderComponent } from './card-slider.component';

@NgModule({
  declarations: [CardSliderComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    AvatarModule,
    CardAvatarCptModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [CardSliderComponent],
})
export class CardSliderCptModule {}
