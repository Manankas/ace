import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {CustomFieldListComponent} from './custom-field-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatExpansionModule,
        MatIconModule,
        TranslateModule,
    ],
  declarations: [CustomFieldListComponent],
  exports: [CustomFieldListComponent],
})
export class CustomFieldListModule {

}
