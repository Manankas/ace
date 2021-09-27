import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarModule } from 'ngx-avatar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';

import { CardAvatarComponent } from './card-avatar.component';

@NgModule({
  declarations: [CardAvatarComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    AvatarModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [CardAvatarComponent],
})
export class CardAvatarCptModule {}
