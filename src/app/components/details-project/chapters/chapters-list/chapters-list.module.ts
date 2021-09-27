import { NgModule } from '@angular/core';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { MaterialModule } from '../../../../material.module';
import { ChapterAddFormCptModule } from '../chapter-form/chapter-form.module';
import { ChaptersListComponent } from './chapters-list.component';
import {AvatarModule} from 'ngx-avatar';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ChaptersListComponent],
    imports: [MaterialModule, ChapterAddFormCptModule, NgxSkeletonLoaderModule, AvatarModule, TranslateModule],
  exports: [ChaptersListComponent],
})
export class ChaptersListCptModule {}
