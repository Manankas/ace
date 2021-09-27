import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AvatarModule } from 'ngx-avatar';
import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { CardAvatarCptModule } from '../../card-avatar/card-avatar.module';
import { ImageModalCptModule } from '../../image-modal/project-cover.module.ts';
import { AutogrowTextareaModule } from '../../shared/autogrow-textarea/autogrow-textarea.module';
import { AddMemberModule } from './add-member/add-member.module';
import { GroupUpdateFormComponent } from './group-update-form.component';
import {CustomFieldModule} from "../../shared/custom-field/custom-field.module";

@NgModule({
  declarations: [GroupUpdateFormComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        MaterialModule,
        CardAvatarCptModule,
        TranslateModule,
        ImageModalCptModule,
        AutogrowTextareaModule,
        MatButtonModule,
        AddMemberModule,
        MatListModule,
        AvatarModule,
        MatMenuModule,
        CustomFieldModule,
    ],
  exports: [GroupUpdateFormComponent],
})
export class GroupUpdateFormCptModule {}
