import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationPageRoutingModule } from './notification-routing.module';
import { NotificationPage } from './notification.page';
import {TranslateModule} from '@ngx-translate/core';
import {FollowRequestModule} from '../../components/notification/follow-request/follow-request.module.ts';
import {CollaborationRequestCptModule} from '../../components/notification/collaboration-request/collaboration-request.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NotificationPageRoutingModule,
        FollowRequestModule,
        CollaborationRequestCptModule,
        TranslateModule
    ],
  declarations: [NotificationPage],
})
export class NotificationPageModule {}
