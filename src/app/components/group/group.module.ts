import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupListCptModule } from './group-list/group-list.module';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GroupComponent],
    imports: [CommonModule, IonicModule, MatIconModule, GroupListCptModule, TranslateModule],
  exports: [GroupComponent],
})
export class GroupCptModule {}
