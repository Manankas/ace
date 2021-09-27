import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SpeciesFormComponent} from './species-form.component';
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
  declarations: [SpeciesFormComponent],
  exports: [SpeciesFormComponent],
})
export class SpeciesFormModule {

}
