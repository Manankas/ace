import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { CharacterAddFormComponent } from './character-add-form.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CharacterAddFormComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        MaterialModule,
        TranslateModule,
    ],
  exports: [CharacterAddFormComponent],
})
export class CharacterAddFormCptModule {}
