import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollableDirectiveModule } from 'src/app/directives/scrollable.directive.module';
import { IonicModule } from '@ionic/angular';
import { DiscussionItemModule } from '../../../chat/discussion-item/discussion-item.module';
import { SendMessageModule } from '../../../chat/send-message/send-message.module';
import { CollaborationChatComponent } from './collaboration-chat.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SendMessageModule,
        DiscussionItemModule,
        ScrollableDirectiveModule,
        TranslateModule,
    ],
  declarations: [CollaborationChatComponent],
  exports: [CollaborationChatComponent],
})
export class CollaborationChatModule {}
