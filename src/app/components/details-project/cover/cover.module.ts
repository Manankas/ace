import { ProjectCardCptModule } from './../../projects/project-card/project-card.module';
import { CoverComponent } from './cover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [CoverComponent],
    imports: [ProjectCardCptModule, IonicModule, CommonModule, TranslateModule],
  exports: [CoverComponent],
})
export class CoverCptModule {}
