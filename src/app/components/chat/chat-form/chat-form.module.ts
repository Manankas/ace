import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollableDirectiveModule } from 'src/app/directives/scrollable.directive.module';

import { IonicModule } from '@ionic/angular';

import { DiscussionItemModule } from '../discussion-item/discussion-item.module';
import { SendMessageModule } from '../send-message/send-message.module';
import { ChatFormComponent } from './chat-form.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DiscussionItemModule,
    SendMessageModule,
    ScrollableDirectiveModule,
  ],
  declarations: [ChatFormComponent],
  exports: [ChatFormComponent],
})
export class ChatFormModule {}
