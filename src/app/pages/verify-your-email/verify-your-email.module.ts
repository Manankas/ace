import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyYourEmailPageRoutingModule } from './verify-your-email-routing.module';

import { VerifyYourEmailPage } from './verify-your-email.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerifyYourEmailPageRoutingModule,
        TranslateModule
    ],
  declarations: [VerifyYourEmailPage]
})
export class VerifyYourEmailPageModule {}
