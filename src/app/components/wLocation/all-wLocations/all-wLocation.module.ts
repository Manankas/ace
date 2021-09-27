import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AvatarModule } from 'ngx-avatar';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SharedTreeModule } from '../../shared/shared-tree/shared-tree.module';
import { WLocationDetailsModule } from '../wLocation-details/wLocation-details.module';
import { AllWLocationsComponent } from './all-wLocations.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    WLocationDetailsModule,
    SharedTreeModule,
    MatIconModule,
    TranslateModule,
    AvatarModule,
  ],
  declarations: [AllWLocationsComponent],
  exports: [AllWLocationsComponent],
})
export class AllWLocationModule {}
