import { NgModule } from '@angular/core';
import { FormAddComponent } from './form-add.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, MaterialModule, TranslateModule, MatButtonModule],
  declarations: [FormAddComponent],
  exports: [FormAddComponent],
})
export class FormAddProjectModule {}
