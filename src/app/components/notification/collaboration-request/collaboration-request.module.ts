import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CollaborationRequestComponent } from './collaboration-request.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [CollaborationRequestComponent],
  exports: [CollaborationRequestComponent],
})
export class CollaborationRequestCptModule {}
