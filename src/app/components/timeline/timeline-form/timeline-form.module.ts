import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {TimelineFormComponent} from './timeline-form.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        TranslateModule,
    ],
  declarations: [TimelineFormComponent],
  exports: [TimelineFormComponent],
})
export class TimelineFormModule {

}
