import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipsModule } from 'src/app/directives/ionic-tooltips/src/lib/tooltips.module';

import { IonicModule } from '@ionic/angular';

import { DeletedListModule } from '../../trash/deleted-list/deleted-list.module';
import { ProjectArchiveComponent } from './project-archive.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, IonicModule, DeletedListModule, TooltipsModule, TranslateModule],
  declarations: [ProjectArchiveComponent],
  exports: [ProjectArchiveComponent, TooltipsModule],
})
export class ProjectArchiveModule {}
