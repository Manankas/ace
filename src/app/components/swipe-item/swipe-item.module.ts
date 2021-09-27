import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwipeItemComponent } from './swipe-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
  declarations: [SwipeItemComponent],
  exports: [SwipeItemComponent],
})
export class SwipeItemCptModule {}
