import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatisticComponent} from './statistic.component';
import {StatGraphicsModule} from './start-graphics/stat-graphics.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        StatGraphicsModule,
        TranslateModule,
    ],
  declarations: [StatisticComponent],
  exports: [StatisticComponent]
})
export class StatisticModule {}
