import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  declarations: [ImageUploadComponent],
  exports: [ImageUploadComponent],
})
export class ImageUploadCptModule {}
