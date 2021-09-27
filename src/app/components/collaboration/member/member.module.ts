import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MemberComponent} from './member.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule
    ],
  declarations: [MemberComponent],
  exports: [MemberComponent]
})
export class MemberModule {}
