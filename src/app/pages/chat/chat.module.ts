import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatPageRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';
import {ChatFormModule} from '../../components/chat/chat-form/chat-form.module';
import {SearchUsersModule} from '../../components/chat/search-users/search-users.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatFormModule,
        SearchUsersModule,
        ChatPageRoutingModule,
        TranslateModule
    ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
