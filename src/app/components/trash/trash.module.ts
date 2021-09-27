import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {TrashComponent} from './trash.component';
import {TrashListModule} from './trash-list/trash-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TrashListModule,
        TranslateModule,
    ],
  declarations: [TrashComponent],
  exports: [TrashComponent],
})
export class TrashModule {

}
