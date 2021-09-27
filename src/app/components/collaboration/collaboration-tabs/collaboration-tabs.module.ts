import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MatTabsModule} from '@angular/material/tabs';
import {CollaborationActivationModule} from './collaboration-activation/collaboration-activation.module';
import {CollaborationChatModule} from './collaboration-chat/collaboration-chat.module';
import {CollaborationMembersModule} from './collaboration-members/collaboration-members.module';
import {CollaborationTabsComponent} from './collaboration-tabs.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatTabsModule,
        CollaborationActivationModule,
        CollaborationChatModule,
        CollaborationMembersModule,
        TranslateModule
    ],
  declarations: [CollaborationTabsComponent]
})
export class CollaborationTabsModule {}
