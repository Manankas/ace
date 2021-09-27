import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarModule } from 'ngx-avatar';
import { IonicModule } from '@ionic/angular';
import { AlarmComponent } from './alarm.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AvatarModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    TranslateModule,
  ],
  declarations: [AlarmComponent],
  exports: [AlarmComponent],
})
export class AlarmCptModule {}
