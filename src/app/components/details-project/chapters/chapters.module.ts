import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {ChaptersComponent} from './chapters.component';
import {MaterialModule} from '../../../material.module';
import {ChaptersListCptModule} from './chapters-list/chapters-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        MaterialModule,
        NgxSkeletonLoaderModule,
        ChaptersListCptModule,
        TranslateModule
    ],
  declarations: [ChaptersComponent
  ],
  exports: [ChaptersComponent],
})
export class ChaptersModule {}
