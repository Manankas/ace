import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {WLocationEditionComponent} from './wLocation-edition.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {CardAvatarCptModule} from '../../card-avatar/card-avatar.module';
import {AutogrowTextareaModule} from '../../shared/autogrow-textarea/autogrow-textarea.module';
import {MatIconModule} from '@angular/material/icon';
import {CustomFieldModule} from "../../shared/custom-field/custom-field.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    MatExpansionModule,
    CardAvatarCptModule,
    AutogrowTextareaModule,
    MatIconModule,
    CustomFieldModule,
  ],
  declarations: [WLocationEditionComponent],
  exports: [WLocationEditionComponent],
})
export class WLocationEditionModule {

}
