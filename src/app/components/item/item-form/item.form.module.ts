import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ItemFormComponent} from './item-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [ItemFormComponent],
  exports: [ItemFormComponent],
})
export class ItemFormModule {

}
