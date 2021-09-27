import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {RequestCodeComponent} from './request-code.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [RequestCodeComponent],
    imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  exports: [RequestCodeComponent],
})
export class RequestCodeModule {}
