import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { IonicModule } from '@ionic/angular';

import { ItemSkeletonComponent } from './item-skeleton.component';

@NgModule({
  imports: [CommonModule, IonicModule, NgxSkeletonLoaderModule],
  declarations: [ItemSkeletonComponent],
  exports: [ItemSkeletonComponent, NgxSkeletonLoaderModule],
})
export class ItemSkeletonCptModule {}
