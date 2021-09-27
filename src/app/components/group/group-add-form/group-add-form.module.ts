import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { CardAvatarCptModule } from '../../card-avatar/card-avatar.module';
import { CardSliderCptModule } from '../../card-slider/card-slider.module';
import { GroupAddFormComponent } from './group-add-form.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [GroupAddFormComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        MaterialModule,
        CardAvatarCptModule,
        TranslateModule,
    ],
  exports: [GroupAddFormComponent],
})
export class GroupAddFormCptModule {}
