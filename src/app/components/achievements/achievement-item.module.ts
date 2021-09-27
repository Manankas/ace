import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IonicModule } from '@ionic/angular';

import {
  TooltipsModule,
} from '../../directives/ionic-tooltips/src/lib/tooltips.module';
import { AchievementItemComponent } from './achievement-item.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatTooltipModule,
    TooltipsModule,
  ],
  declarations: [AchievementItemComponent],
  exports: [AchievementItemComponent],
})
export class AchievementItemCptModule {}
