import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowRequestComponent } from './follow-request.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  declarations: [FollowRequestComponent],
  exports: [FollowRequestComponent],
})
export class FollowRequestModule {}
