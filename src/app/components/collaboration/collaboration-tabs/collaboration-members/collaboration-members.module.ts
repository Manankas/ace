import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MemberModule} from '../../member/member.module';
import {MemberRoleModule} from '../../member/member-role/member-role.module';
import {TranslateModule} from '@ngx-translate/core';
import {FollowRequestModule} from '../../../notification/follow-request/follow-request.module.ts';
import {ChatFormModule} from '../../../chat/chat-form/chat-form.module';
import {CollaborationMembersComponent} from './collaboration-members.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MemberModule,
        MemberRoleModule,
        TranslateModule,
        FollowRequestModule,
        ChatFormModule
    ],
  declarations: [CollaborationMembersComponent],
  exports: [CollaborationMembersComponent]
})
export class CollaborationMembersModule {}
