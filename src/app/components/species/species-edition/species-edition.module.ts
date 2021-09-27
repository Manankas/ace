import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SpeciesEditionComponent} from './species-edition.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ImageModalCptModule} from '../../image-modal/project-cover.module.ts';
import {TranslateModule} from '@ngx-translate/core';
import {AutogrowTextareaModule} from '../../shared/autogrow-textarea/autogrow-textarea.module';
import {CustomFieldModule} from '../../shared/custom-field/custom-field.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatExpansionModule,
        ImageModalCptModule,
        TranslateModule,
        AutogrowTextareaModule,
        CustomFieldModule,
        MatIconModule,
    ],
  declarations: [SpeciesEditionComponent],
  exports: [SpeciesEditionComponent],
})
export class SpeciesEditionModule {

}
