import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ChartsModule} from 'ng2-charts';
import {StartGraphicsComponent} from './start-graphics.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChartsModule,
        MatSliderModule,
        MatCardModule,
        TranslateModule
    ],
  declarations: [StartGraphicsComponent],
  exports: [StartGraphicsComponent]
})
export class StatGraphicsModule {}
