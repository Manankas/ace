import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { ImageSliderComponent } from './image-slider.component';
import {ImageModalCptModule} from '../image-modal/project-cover.module.ts';

@NgModule({
  declarations: [ImageSliderComponent],
  imports: [CommonModule, IonicModule, MaterialModule, ImageModalCptModule],
  exports: [ImageSliderComponent],
})
export class ImageSliderCptModule {}
