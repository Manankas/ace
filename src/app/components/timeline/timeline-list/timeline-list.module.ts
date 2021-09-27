import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {TimelineListComponent} from './timeline-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {TimelineFormModule} from '../timeline-form/timeline-form.module';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatStepperModule,
        TimelineFormModule,
        MatListModule,
        MatRippleModule,
        TranslateModule
    ],
  declarations: [TimelineListComponent],
  exports: [TimelineListComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class TimelineListModule {

}
