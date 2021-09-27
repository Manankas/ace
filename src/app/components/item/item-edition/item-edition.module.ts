import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ItemEditionComponent} from './item-edition.component';
import {ImageModalCptModule} from '../../image-modal/project-cover.module.ts';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';
import {AutogrowTextareaModule} from '../../shared/autogrow-textarea/autogrow-textarea.module';
import {CustomFieldModule} from "../../shared/custom-field/custom-field.module";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ImageModalCptModule,
        MatExpansionModule,
        TranslateModule,
        AutogrowTextareaModule,
        CustomFieldModule
    ],
  declarations: [ItemEditionComponent],
  exports: [ItemEditionComponent],
})
export class ItemEditionModule {

}
