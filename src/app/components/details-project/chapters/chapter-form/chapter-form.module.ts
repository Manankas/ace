import { ChapterFormComponent } from './chapter-form.component';
import { MaterialModule } from '../../../../material.module';
import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ChapterFormComponent],
    imports: [MaterialModule, TranslateModule],
  exports: [ChapterFormComponent],
})
export class ChapterAddFormCptModule {}
