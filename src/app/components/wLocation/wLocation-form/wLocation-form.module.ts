import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WLocationFormComponent} from './wLocation-form.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [WLocationFormComponent],
  exports: [WLocationFormComponent],
})
export class WLocationFormModule {

}
