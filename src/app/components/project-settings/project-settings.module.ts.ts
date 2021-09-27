import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProjectSettingsComponent } from './project-settings.component';
import { EditProjectModule } from './edit-project/edit-project-.module.ts';
import { FormsModule } from '@angular/forms';
import { ImageModalCptModule } from '../image-modal/project-cover.module.ts';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        EditProjectModule,
        ImageModalCptModule,
        TranslateModule,
    ],
  declarations: [ProjectSettingsComponent],
  exports: [ProjectSettingsComponent],
})
export class ProjectSettingsModule {}
