import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {FollowersComponent} from './followers.component';
import {MatTabsModule} from '@angular/material/tabs';
import {SearchUsersModule} from '../../chat/search-users/search-users.module';
import {FollowRequestModule} from '../../notification/follow-request/follow-request.module.ts';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    MatTabsModule,
    SearchUsersModule,
    FollowRequestModule
  ],
  declarations: [FollowersComponent],
  exports: [FollowersComponent],
})
export class FollowersModule {}
