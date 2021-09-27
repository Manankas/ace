import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {DiscussionItemComponent} from './discussion-item.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [DiscussionItemComponent],
  exports: [DiscussionItemComponent],
})
export class DiscussionItemModule {

}
