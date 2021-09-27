import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import {AddMemberComponent} from './add-member.component';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AddMemberComponent],
    imports: [
        CommonModule,
        IonicModule,
        MatListModule,
        FormsModule,
        TranslateModule,
    ],
  exports: [AddMemberComponent],
})
export class AddMemberModule {}
