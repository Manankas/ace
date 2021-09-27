import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {TimelineComponent} from './timeline.component';
import {TimelineListModule} from './timeline-list/timeline-list.module';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TimelineListModule,
        MatIconModule,
        TranslateModule,
    ],
  declarations: [TimelineComponent],
  exports: [TimelineComponent],
})
export class TimelineModule {

}
