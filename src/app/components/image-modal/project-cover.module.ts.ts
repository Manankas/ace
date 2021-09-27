import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ImageModalComponent } from './image-modal.component';
import { ImageUploadCptModule } from './image-upload/image-upload.module.ts';
import { ImageGalleryCptModule } from './image-gallery/image-gallery.module';
import {MatTabsModule} from '@angular/material/tabs';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ImageUploadCptModule,
        ImageGalleryCptModule,
        MatTabsModule,
        TranslateModule,
    ],
  declarations: [ImageModalComponent],
  exports: [ImageModalComponent],
})
export class ImageModalCptModule {}
