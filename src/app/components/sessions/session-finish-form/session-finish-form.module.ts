import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { SessionFinishFormComponent } from './session-finish-form.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SessionFinishFormComponent],
    imports: [CommonModule, IonicModule, MaterialModule, TranslateModule],
  exports: [SessionFinishFormComponent],
})
export class SessionFinishFormCptModule {}
