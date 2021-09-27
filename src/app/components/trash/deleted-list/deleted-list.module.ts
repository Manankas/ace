import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {DeletedListComponent} from "./deleted-list.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatRippleModule} from "@angular/material/core";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule,
        MatRippleModule
    ],
  declarations: [DeletedListComponent],
  exports: [DeletedListComponent],
})
export class DeletedListModule {

}
