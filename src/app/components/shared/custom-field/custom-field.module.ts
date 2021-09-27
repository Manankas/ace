import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {CustomFieldComponent} from './custom-field.component';
import {CustomizeFieldModule} from './customize-field/customize-field.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CustomizeFieldModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        TranslateModule
    ],
  declarations: [CustomFieldComponent],
  exports: [CustomFieldComponent],
})
export class CustomFieldModule {

}
