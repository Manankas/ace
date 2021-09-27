import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { IonicModule } from '@ionic/angular';
import { ChaptersModule } from '../../details-project/chapters/chapters.module';
import { SwipeItemCptModule } from '../../swipe-item/swipe-item.module';
import { SessionFinishFormCptModule } from '../session-finish-form/session-finish-form.module';
import { SessionsListComponent } from './sessions-list.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SessionsListComponent],
    imports: [
        CommonModule,
        IonicModule,
        SwipeItemCptModule,
        SessionFinishFormCptModule,
        MatButtonModule,
        MatIconModule,
        ChaptersModule,
        MaterialModule,
        TranslateModule,
    ],
  exports: [SessionsListComponent],
})
export class SessionsListCptModule {}
