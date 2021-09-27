import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LongPressDirectiveModule } from 'src/app/directives/long-press-directive.module';
import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CollaborationActivationComponent } from './collaboration-activation.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgxQRCodeModule,
        LongPressDirectiveModule,
        TranslateModule,
    ],
  declarations: [CollaborationActivationComponent],
  exports: [CollaborationActivationComponent],
})
export class CollaborationActivationModule {}
