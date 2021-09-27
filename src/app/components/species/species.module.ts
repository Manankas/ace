import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SpeciesComponent} from './species.component';
import {SpeciesListModule} from './species-list/species-list.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SpeciesListModule,
        TranslateModule
    ],
  declarations: [SpeciesComponent],
  exports: [SpeciesComponent],
})
export class SpeciesModule {

}
