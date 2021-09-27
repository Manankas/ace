import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SessionsListCptModule } from './sessions-list/sessions-list.module';
import { SessionsComponent } from './sessions.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SessionsComponent],
    imports: [CommonModule, IonicModule, SessionsListCptModule, TranslateModule],
  exports: [SessionsComponent],
})
export class SessionsCptModule {}
