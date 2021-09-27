import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SpeciesListComponent} from './species-list.component';
import {SpeciesDetailsModule} from '../species-details/species-details.module';
import {SpeciesFormModule} from '../species-form/species-form.module';
import {AvatarModule} from 'ngx-avatar';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SpeciesDetailsModule,
        SpeciesFormModule,
        AvatarModule,
        TranslateModule
    ],
  declarations: [SpeciesListComponent],
  exports: [SpeciesListComponent],
})
export class SpeciesListModule {

}
