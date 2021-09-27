import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SendMessageComponent } from './send-message.component';
import {FooterInputModule} from '../../shared/footer-input/footer-input.module';

@NgModule({
    imports: [CommonModule,  FooterInputModule],
  declarations: [SendMessageComponent],
  exports: [SendMessageComponent],
})
export class SendMessageModule {}
