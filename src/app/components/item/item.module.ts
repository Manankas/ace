import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ItemComponent} from './item.component';
import {ItemListModule} from './item-list/item-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ItemListModule,
        TranslateModule
    ],
  declarations: [ItemComponent],
  exports: [ItemComponent],
})
export class ItemModule {

}
