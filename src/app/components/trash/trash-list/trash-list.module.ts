import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {TrashListComponent} from './trash-list.component';
import {MatRippleModule} from '@angular/material/core';
import {DeletedListModule} from '../deleted-list/deleted-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatRippleModule,
        DeletedListModule,
        TranslateModule
    ],
  declarations: [TrashListComponent],
  exports: [TrashListComponent],
})
export class TrashListModule {

}
