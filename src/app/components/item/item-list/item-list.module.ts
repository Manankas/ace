import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ItemListComponent} from './item-list.component';
import {ItemFormModule} from '../item-form/item.form.module';
import {AvatarModule} from 'ngx-avatar';
import {ItemDetailsModule} from '../item-details/item-details.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ItemFormModule,
        ItemDetailsModule,
        AvatarModule,
        TranslateModule
    ],
  declarations: [ItemListComponent],
  exports: [ItemListComponent],
})
export class ItemListModule {

}
