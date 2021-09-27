import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {SearchUsersComponent} from './search-users.component';
import {FollowCptModule} from '../../follower/follow/follow.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FollowCptModule,
        TranslateModule
    ],
  declarations: [SearchUsersComponent],
  exports: [SearchUsersComponent],
})
export class SearchUsersModule {

}
