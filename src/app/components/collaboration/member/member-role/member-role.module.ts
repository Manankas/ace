import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemberRoleComponent} from './member-role.component';
import {MatListModule} from '@angular/material/list';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        IonicModule,
        TranslateModule,
        FormsModule,
        MatCheckboxModule
    ],
  declarations: [MemberRoleComponent],
  exports: [MemberRoleComponent]
})
export class MemberRoleModule {}
