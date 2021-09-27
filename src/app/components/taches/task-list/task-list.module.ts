import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { TacheSlideItemCptModule } from '../task-slide-item/task-slide-item.module';
import { TaskFormModule } from '../task-form/task-form.module';
import { TaskListComponent } from './task-list.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        TacheSlideItemCptModule,
        IonicModule,
        CommonModule,
        TaskFormModule,
        TranslateModule,
    ],
  declarations: [TaskListComponent],
  exports: [TaskListComponent],
})
export class TachesListCptModule {}
