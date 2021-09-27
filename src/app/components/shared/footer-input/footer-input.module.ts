import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {FooterInputComponent} from './footer-input.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        TranslateModule
    ],
  declarations: [FooterInputComponent],
  exports: [FooterInputComponent],
})
export class FooterInputModule {

}
