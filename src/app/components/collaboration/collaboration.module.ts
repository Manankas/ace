import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CollaborationComponent} from './collaboration.component';
import {CollaborationTabsModule} from './collaboration-tabs/collaboration-tabs.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        CollaborationTabsModule,
        IonicModule,
        TranslateModule
    ],
  declarations: [CollaborationComponent],
  exports: [CollaborationComponent]
})
export class CollaborationModule {}
