import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ImageGalleryComponent } from './image-gallery.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, MatRippleModule],
  declarations: [ImageGalleryComponent],
  exports: [ImageGalleryComponent],
})
export class ImageGalleryCptModule {}
