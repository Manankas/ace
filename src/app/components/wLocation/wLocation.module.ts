import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {WLocationComponent} from './wLocation.component';
import {WLocationCardModule} from './wLocation-card/wLocation-card.module';
import {WLocationDetailsModule} from './wLocation-details/wLocation-details.module';
import {AllWLocationModule} from './all-wLocations/all-wLocation.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        WLocationCardModule,
        WLocationDetailsModule,
        AllWLocationModule,
        TranslateModule
    ],
  declarations: [WLocationComponent],
  exports: [WLocationComponent],
})
export class WLocationModule {

}
