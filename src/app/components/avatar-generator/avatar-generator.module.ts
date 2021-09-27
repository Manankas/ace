import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AvatarGeneratorComponent } from './avatar-generator.component';

@NgModule({
  declarations: [AvatarGeneratorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [AvatarGeneratorComponent],
})
export class AvatarGeneratorCptModule {}
